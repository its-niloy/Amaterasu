import asyncio
import subprocess
from pathlib import Path
from bot import LOGGER

def generate_vpy_script(input_file: str, output_vpy: str) -> str:
    """
    Dynamically generates the VapourSynth script for the anime preprocessing pipeline.
    Uses dfttest, BM3D, NLM, MVTools, and dehalo_alpha.
    """
    input_file = str(Path(input_file).absolute())
    # Ensure forward slashes for cross-platform safety in the VapourSynth script
    input_file_escaped = input_file.replace('\\', '/')
    
    script_content = f"""import sys
sys.path.append("/usr/local/lib/python3.11/site-packages")
import vapoursynth as vs
from vsdenoise import DFTTest, BM3D, NLM, MVTools
from vsdehalo import dehalo_alpha

core = vs.core
# Load video using LWLibavSource (preferred for indexing) or FFMS2
try:
    clip = core.lsmas.LWLibavSource(r"{input_file_escaped}")
except Exception as e:
    sys.stderr.write(f"LSMSource missing, trying FFMS2... ({{e}})\\n")
    clip = core.ffms2.Source(r"{input_file_escaped}")

# Denoise (dfttest) with sigma curve
try:
    sigma_curve = {{0.0: 0.3, 0.4: 0.3, 0.6: 0.6, 0.8: 1.5, 1.0: 2.0}}
    clip = DFTTest.denoise(clip, sloc=sigma_curve, tr=2, planes=[0, 1, 2])
except Exception as e:
    sys.stderr.write(f"[VapourSynth] Skipping DFTTest: {{e}}\\n")

# BM3D Denoise on luma
try:
    clip = BM3D.denoise(clip, sigma=32, tr=2, profile=BM3D.Profile.FAST, planes=0)
except Exception as e:
    sys.stderr.write(f"[VapourSynth] Skipping BM3D: {{e}}\\n")

# Non-Local Means (NLM) on chroma
try:
    clip = NLM.denoise(clip, h=0.6, tr=2, a=2, planes=[1, 2])
except Exception as e:
    sys.stderr.write(f"[VapourSynth] Skipping NLM: {{e}}\\n")

# Motion-Compensated Degrain
try:
    clip = MVTools.denoise(clip, thSAD=100, prefilter=MVTools.Prefilter.DFTTEST, preset=MVTools.Preset.HQ_SAD)
except Exception as e:
    sys.stderr.write(f"[VapourSynth] Skipping MVTools: {{e}}\\n")

# Dehalo
try:
    clip = dehalo_alpha(clip)
except Exception as e:
    sys.stderr.write(f"[VapourSynth] Skipping Dehalo: {{e}}\\n")

# Set 10-bit output and pass frames for SVT-AV1
try:
    clip = core.resize.Point(clip, format=vs.YUV420P10)
except Exception as e:
    sys.stderr.write(f"[VapourSynth] Format conversion failed: {{e}}\\n")

clip.set_output()
"""
    with open(output_vpy, 'w', encoding='utf-8') as f:
        f.write(script_content)
    
    return output_vpy




WW Operator Training — Full Integrated Build

Upload the entire contents of this ZIP to your GitHub repo root, preserving folders:
- css/
- js/
- generators/
- data/
- admin/

Then in GitHub:
Settings → Pages → Deploy from branch → main → /(root)

Main pages:
- index.html
- practice.html
- quiz.html
- exam.html
- adaptive.html
- survival.html
- study.html
- progress.html
- admin/generator.html

Architecture:
- Math engine and non-math engine are separated.
- Quiz and exam generate the full set at the start and lock it for the session.
- Study pages use the same truth libraries as the non-math engine.
- Progress is stored in browser localStorage.

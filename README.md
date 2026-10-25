# DC Circuit Explorer — web edition

A self-contained browser conversion of the MATLAB DC Circuit Explorer for physics and engineering teaching. All three activities are included: DC resistor networks, RC charging/discharging, and magnetic force on a current-carrying wire.

## Preview locally

Extract the ZIP and double-click `index.html`. No MATLAB, installation, build step, external libraries, account, or internet connection is needed after download. Use a current browser with JavaScript enabled. The page starts paused. Reload restores defaults.

## Upload to GitHub Pages

1. Create a GitHub repository, for example `dc-circuit-explorer`.
2. Extract this package and upload its **contents** to the repository root. Upload `index.html`, not just the ZIP. The HTML file alone is sufficient to run the lab; keep the remaining files for reference.
3. Under **Settings → Pages**, choose **Deploy from a branch**, select **main**, folder **/(root)**, and save.
4. Wait for deployment and open the published URL shown in Pages settings. A typical URL is:

```text
https://YOUR-USERNAME.github.io/dc-circuit-explorer/
```

If adding this to an existing Pages repository, place the HTML in its published folder or a subfolder and include that folder in the URL. GitHub filenames and paths are case-sensitive.

Official reference: [Configure a GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Embed in Canvas

1. Open `Canvas-embed-code.txt` and replace **both** placeholder URLs with the actual published GitHub Pages URL.
2. Create or edit a Canvas Page. Open the Rich Content Editor's HTML editor and paste the iframe and accompanying link.
3. Save, then test in Student View. The frame can scroll; adjust its height for your course layout. The separate link lets students use the lab in a full browser tab.

Use the published `github.io` URL, rather than a repository, blob, or raw-file URL. Host the JavaScript on GitHub Pages; do not paste the entire simulator source into the Canvas editor. If your institution restricts external embeds, use the launch link or a module External URL opening in a new tab.

Official references: [Canvas HTML editor](https://community.instructure.com/en/kb/articles/662912-how-do-i-use-the-html-view-in-the-rich-content-editor), [external embeds](https://community.instructure.com/en/kb/articles/662934-unknown).

## Activities and controls

### 1. DC circuits

Series, parallel, series-plus-parallel, and two-source/two-loop circuits. Adjust emf, resistances, and internal resistance. Open the last parallel branch in the parallel or mixed circuit. Select a closed loop to inspect potential rises and drops; opening a branch selects the remaining loop automatically.

The schematic gives node potentials and signed resistor currents. Blue arrows show actual conventional current; the stated node-to-node reference defines the current sign. Long battery plates identify positive **reference** terminals; negative emf reverses the source relative to that reference. Both sources share the internal resistance setting.

The potential graph is a component traversal, not distance or a spatial electric-field profile. Power is positive when absorbed and negative when supplied. Source power and internal heating are shown separately. Current and power residuals check conservation numerically. The terminal-voltage statistic is battery 1's external terminal voltage relative to ground N1.

Start animates electron markers, moving opposite conventional current; their exaggerated speeds do not model microscopic motion or signal propagation. Reduced-motion preferences require explicit checkbox opt-in. Step advances animation phase without changing a steady DC solution. Parameter edits reset and pause the experiment.

### 2. RC transients

Uses R1, C, and an ideal E1 source; internal battery resistance is omitted in this activity, matching MATLAB. Voltage, signed current, charge, time constant, battery work, capacitor-energy change, and resistor heat are shown.

Switching between charge and discharge preserves capacitor voltage and starts a new time segment. Energy accounting is relative to that segment's initial state. Reset in charge mode starts at Vc = 0; Reset in discharge mode starts at Vc = E1. Parameter edits reset the experiment. Discharging current is negative in the charging reference direction for a positively charged capacitor.

Playback advances 0.5 time constants per real second, pauses at 10 time constants, and pauses when the browser tab becomes hidden. Step advances 0.04 time constants. The orange vertical line indicates the current model time. Exact exponential solutions avoid numerical time-integration error.

### 3. Magnetic force

I = E1/(R1+r) feeds a fixed, negligible-resistance wire. Its reference vector lies in the x–z plane and its angle is measured from +z. The prescribed field is along signed z, and the force uses F = I(L × B). Reverse emf or field to reverse force. Align the wire with the field to eliminate force.

The vector diagram is a fixed oblique projection. Wire orientation, field direction, and force direction use normalized display lengths; numerical readouts and the force-angle curve carry physical magnitudes. The wire stays fixed; there is no motion, induction, or back emf. Start and Step are disabled for this static activity.

## Teaching and export

Each activity has a **Predict, observe, explain** panel. `Teaching-guide.md` provides a lesson sequence and numerical checkpoints. **Download figure (SVG)** saves the diagram and plots as a scalable vector image with settings and explanatory captions; its format differs from MATLAB's PNG export. Open the SVG in a browser or import it into compatible presentation/document software.

No student accounts, tracking, data collection, persistent storage, or grade reporting are included. The page runs locally in each student's browser.

## Physics and textbook alignment

The browser version preserves the MATLAB equations and defaults. DC networks use modified nodal analysis with partial-pivot Gaussian elimination. RC transients use exact exponential solutions and energy formulas for arbitrary initial capacitor voltage. Magnetic force uses the signed vector cross product. Layout and plotting use embedded SVG instead of MATLAB figures; RC voltage and current have separate plots for readability.

Aligned with Tipler and Mosca's sixth-edition Chapter 25, *Electric Current and Direct-Current Circuits*, and the current-force introduction to Chapter 26, *The Magnetic Field*. This is an original demonstration, not a reproduction of textbook figures or exercises. Calculating fields generated by currents is a later Chapter 27 extension. The MATLAB implementation remains in the earlier package.

## Verification and limits

Run these optional developer checks with Node.js (Node is not needed by students):

```text
node verify.cjs
node verify-interface.cjs
```

Tests cover reference circuit solutions; 48 combinations of topology, extreme parameter settings, and open branches; current and power conservation; reversed currents; RC energy balance and switching continuity; magnetic-force reversal and alignment; and interface initialization and state changes using a mocked DOM. Interface checks exercise all presets, loop selection, branch opening, invalid input, RC playback/switch/reset, magnetic zero/reversal cases, and SVG export. The JavaScript results also agree with 24 DC reference circuits exported from the MATLAB solver. Generated figure exports were checked as well-formed XML.

These checks exercise calculation and interface code, not real browser painting. The preview browser could not connect to the local HTTP server, so visual browser QA, pointer behavior, and Canvas embedding remain unverified. Test the published page and Canvas Student View after upload. This package has been prepared for upload; no GitHub repository or Canvas Page has been modified.

## Files

- `index.html`: complete app, with all CSS, JavaScript, and SVG embedded.
- `Canvas-embed-code.txt`: iframe and full-page launch link.
- `Teaching-guide.md`: staged lesson plan adapted from the MATLAB package.
- `.nojekyll`: static GitHub Pages marker.
- `verify.cjs`, `verify-interface.cjs`: optional developer checks.
- `matlab-reference.json`: DC results generated by the MATLAB helper for cross-language verification.


# Suggested teaching sequence

Use a predict → observe → explain routine. Ask for predictions before changing controls; reveal numerical readouts after students commit to an answer.

## 1. One loop: current and potential

Begin with the Series preset: E1 = 12 V, R1 = 100 ohm, R2 = 200 ohm, internal r = 0.

- Expected current: 0.040 A everywhere in the loop.
- Drops: 4 V across R1 and 8 V across R2.
- Node N3 is 8 V relative to ground; the battery's external positive terminal is 12 V.
- Load powers: 0.16 W and 0.32 W. Battery supplies 0.48 W.

Ask whether charge or current is consumed in a resistor. Use the equal series currents and the potential drops to distinguish charge conservation from energy transfer. Toggle electron markers and compare their direction with the current arrows.

Double both resistances. Students should predict half the current and half the total power at fixed emf. When changing only R1 in a two-resistor circuit, derive the new current before predicting individual resistor powers; a simple inverse proportionality does not hold for each resistor independently.

## 2. Parallel branches and a real battery

Select Parallel with the same E1, R1, and R2. Keep r = 0 initially.

- Branch currents are 0.12 A and 0.06 A; source delivers 0.18 A.
- Both resistors have the same 12 V terminal voltage.
- Open the last parallel branch: the remaining current is unchanged for the ideal battery.

Set r = 10 ohm and close the branch. Terminal voltage is 12/(1+10(1/100+1/200)) = 10.4348 V. Total current is approximately 0.156522 A. Open the R2 branch: terminal voltage rises to 10.9091 V and source current falls to 0.109091 A. Explain why the remaining branch current changes now.

## 3. Junction and loop rules

Select Series + parallel. Return r to zero and use R1 = 100, R2 = 200, R3 = 300 ohm.

- Parallel equivalent resistance is 120 ohm; total resistance is 220 ohm.
- Source current is approximately 0.0545455 A.
- Junction potential is approximately 6.54545 V.
- Branch currents are approximately 0.0327273 and 0.0218182 A.

Compare both loop traversals. Ask students to write the junction equation and one loop equation before reading the values.

In the two-source circuit, use E1 = 12 V and vary E2. With r = 0, R3 carries zero current when E2 matches the divider voltage E1*R2/(R1+R2) = 8 V. Crossing that value reverses R3 current. Discuss a negative solved current as a direction result, then inspect which source supplies or absorbs power.

## 4. RC transients

Use E1 = 12 V, R1 = 1000 ohm, C = 1000 microfarad. The time constant is 1 s. Reset in charge mode.

- Initial current: 12 mA. Initial capacitor voltage: 0 V.
- At one time constant: Vc approximately 7.58545 V; current approximately 4.41455 mA.
- Long-time charge: 0.012 C; stored energy: 0.072 J.
- Long-time battery work: 0.144 J; resistor heat: 0.072 J.

Pause near one time constant and switch to discharge. Capacitor voltage must remain continuous; current can change abruptly in this ideal model. The plots restart their time axis and energy reference at the switch.

Double C and reset in charge mode. Ask why the time constant doubles while the initial current stays at 12 mA. Compare R changes separately. Explain why plots of charging from an initially charged capacitor require keeping track of initial energy.

## 5. Magnetic force as a Chapter 26 bridge

Use E1 = 12 V, R1 = 100 ohm, r = 0, Bz = +0.5 T, length = 0.3 m, angle = 90 degrees.

- Current: +0.12 A in the positive wire reference direction.
- Reference wire lies along +x; field points along +z.
- Force is along -y, magnitude 0.018 N.

Reverse E1. Then reverse Bz. Ask students to use the cross product to predict each reversal. Set the angle to 0 degrees and explain the zero force. Increase R1 and connect the resulting force change back to Ohm's law.

Keep the wire fixed during this activity. A moving-wire or motor extension would require additional electrical and mechanical modeling. Follow later with charged-particle motion, torque on current loops, and Hall-effect activities if broader Chapter 26 coverage is desired.

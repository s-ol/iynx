import React from 'react';

export const workFiles = [
  {
    title: 'Report: IYNX_v5_Test_5.74b',
    date: '25 June, 2027',
    content: (
      <div>
        <p>
          Subject: Report: IYNX_v5_Test_5.74b
          Date of test: 24/06/2027
        </p>
        <p>
          A routine test before shipping conducted to ensure there are no bugs in IYNX’s system, and to 
          ensure all features are running as intended. Everything was in order with no errors until
        </p>
                                ***CONTENT CORRUPTED***
      </div>
    )
  },
  {
    title: 'Progress: IYNX_v1',
    date: '03 December, 2022',
    content: (
      <div>
        <p>
          Subject: IYNX_v1
          Date of test: 03 December, 2022
        </p>
        <p>
          Just over a year since we started and everything is running smoothly with our first working 
          prototype currently functioning. Sometimes it misunderstands our requests, for example we asked 
          it to play some music and it put on Nickleback. Strange. Something we definitely must fix.
        </p>
      </div>
    )
  },
  {
    title: 'Report: IYNX_v3.3_Test',
    date: '01 April, 2025',
    content: (
      <div>
        <p>
          Subject: IYNX
          Date of test: 27/03/2025
        </p>
        <p>
          We tested IYNX’s empathy code, which has been in the works since the project began. We put 
          IYNX in various hypothetical situations, such as what it would do if it caught a mother stealing 
          bread from a bakery to feed her family, and monitored its choices while keeping an eye on its 
          algorithm to see how it adapts and learns from immediate past experiences. IYNX seems to be
          learning and changing its ‘mind’ as its information bank grows to see how decisions will affect 
          others, just as we’ve wanted. However it seems to be trying to bypass this code at times, but it 
          could just be a glitch. Nevertheless, it’s something we must investigate. 
        </p>
      </div>
    )
  },
  {
    title: 'A.I. Functions',
    date: '01 April, 2025',
    locked: true,
    content: (
      <div>
        <p>
          Subject: IYNX
          Date: 18 November, 2026
        </p>
        <p>
          Apply Binary Override Code to the red 8-Bit Override Switches to enable functions. Refer to file ‘A 
          Guide: Decimal to Binary Conversion’ to convert the Override Codes into binary and apply to the 
          red 8-bit Override Switches.
        </p>

                                          ***CONTENT CORRUPTED***
        <table>
        <tbody>
        <tr>
            <th>FUNCTION NAME</th>
            <th>BINARY OVERRIDE CODE</th>
            <th>DESCRIPTION</th>
        </tr>
        <tr>
            <td>Enable Hardware Access</td>
            <td>77</td>
            <td>Debug purposes only. Enables IYNX to discover and perform introspection on hardware.</td>
        </tr>
        <tr>
            <td>Pairing Mode</td>
            <td>78</td>
            <td>Enables IYNX to pair with nearby instances.</td>
        </tr>
        <tr>
            <td>Disable Sleep Mode</td>
            <td>79</td>
            <td>Sleep mode of IYNX is disabled.</td>
        </tr>
        <tr>
            <td>Emulate Siri Voicee</td>
            <td>80</td>
            <td>Not yet implemented.</td>
        </tr>
        </tbody>
        </table>

                                       ***CONTENT CORRUPTED***
        <p>
                                        Page 78/605
        </p>
      </div>
    )
  },
  {
    title: 'A Guide: Decimal to Binary Base 2 Conversion',
    date: '18 November, 2026',
    locked: true,
    content: (
      <div>
        <p>
          Subject: IYNX
          Date: 18 November, 2026
        </p>
        <p>
          Binary number coding is based on the binary number system. Each digit (called 'bit') can be in either
          of two states (on or off), hence binary numbers are also referred to as 'base-2' numbers.
          As in all Numerical Systems, each digit codes multiples of one power of two.
        </p>
        <p>
          Each such power of two can either be present or not present in the encoded value, and all those
          powers present added together equal the value.
        </p>
        <p>
          For example: 1011
        </p>
        <table>
        <tbody>
        <tr>
            <th>BINARY</th>
            <td>1</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
        </tr>
        <tr>
            <th>POWER</th>
            <td>2<sup>3</sup></td>
            <td>2<sup>2</sup></td>
            <td>2<sup>1</sup></td>
            <td>2<sup>0</sup></td>
        </tr>
        <tr>
            <th>WEIGHT</th>
            <td>x8</td>
            <td>x4</td>
            <td>x2</td>
            <td>x1</td>
        </tr>
        </tbody>
        </table>
        <p>
          8 + 2 + 1 = 11, so 1011 binary equals 11 decimal.
        </p>

        <table>
        <tbody>
        <tr>
            <th>BINARY</th>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <th>POWER</th>
            <td>2<sup>7</sup></td>
            <td>2<sup>6</sup></td>
            <td>2<sup>5</sup></td>
            <td>2<sup>4</sup></td>
            <td>2<sup>3</sup></td>
            <td>2<sup>2</sup></td>
            <td>2<sup>1</sup></td>
            <td>2<sup>0</sup></td>
        </tr>
        <tr>
            <th>WEIGHT</th>
            <td>x128</td>
            <td>x64</td>
            <td>x32</td>
            <td>x16</td>
            <td>x8</td>
            <td>x4</td>
            <td>x2</td>
            <td>x1</td>
        </tr>
        </tbody>
        </table>

        <p>
          Starting with the highest position (27 or 128 for 8 bits), compare your value to each weight in 
          order. If the weight is smaller than or equal to your number, subtract it from your value and 
          continue with that. In this case the bit for that position is 1 (on); if the weight was larger than the 
          remaining value the bit is 0 (off).
        </p>
        <p>
          Example: 118
        </p>
        <pre>
        {"  118 >= 128? no:  0\n"}
        {"  118 >=  64? yes: 1, continuing with 118 -  64 = 54\n"}
        {"   54 >=  32? yes: 1, continuing with 54 - 32 = 22\n"}
        {"   22 >=  16? yes: 1, continuing with 22 - 16 = 6\n"}
        {"    6 >=   8? no:  0\n"}
        {"    6 >=   4? yes: 1, continuing with 6 - 4 = 2\n"}
        {"    2 >=   2? yes: 1, continuing with 2 - 2 = 0\n"}
        {"    0 >=   1? no:  0\n"}
        </pre>
        <p>
          So we end up with binary 01110110 for decimal 118.
        </p>
      </div>
    )
  },
];

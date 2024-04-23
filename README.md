# ESBuild Browserslist

Use Browserslist definition as ESBuild targets.

## Usage

Add the function to the `target` field of your `esbuild.config.js`:

```javascript
import getBrowserslistTargets from '@eklingen/esbuild-browserslist'
target: getBrowserslistTargets(),
```

This will make ESBuild use your `.browserslistrc` as the target definition, where possible.

## Notes & caveats

### 1. Unsupported target names

The following browserslist targets are NOT supported:
`android`, `and_qq`, `and_uc`, `baidu`, `bb`, `kaios`, `op_mob` and `op_mini`.
(for android, choose an equivalent target like "chrome", and for "op_mob" choose an equivalent target like "opera")

### 3. Unsupported target versions

The following target versions are NOT supported:
`all` and `TP` (as in `op_mob all` and `safari TP`).

### 3. Supported targets

The following browserslist targets ARE supported:
`chrome`, `edge`, `firefox`, `ie`, `opera`, `safari` and `samsung`.

### 4. Targets mapped to equivalents

The following browserlist targets are mapped to equivalents with the same version number:
`and_chr` to `chrome`, `and_ff` to `firefox`, `ie_mob` to `ie` and `ios_saf` to `safari`.

### 5. Version ranges behavior

For minor versions or ranges (like `ios_saf 12.1-13.3`), the oldest version specified is used (`ios_saf 12`).

### 6. Multiple versions behavior

For duplicate targets, only the oldest version is used.

## Dependencies

This package requires ["browserslist"](https://www.npmjs.com/package/browserslist).

---

Copyright (c) 2024 Elco Klingen. MIT License.

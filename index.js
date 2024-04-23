import browserslist from 'browserslist'

/* About Browserlist targets vs ESBuild targets:
 * - The following browserslist targets are NOT supported:
 *   "android", "and_qq", "and_uc", "baidu", "bb", "kaios", "op_mob" and "op_mini".
 *   (for android, choose an equivalent target like "chrome", and for "op_mob" choose an equivalent target like "opera")
 * - The following browserslist target versions are NOT supported:
 *   "all" and "tp" (as in "op_mob all" or "safari TP").
 * - The following browserslist targets ARE supported:
 *   "chrome", "edge", "firefox", "ie", "opera", "safari" and "samsung".
 * - The following browserlist targets are mapped to equivalents with the same version number:
 *   "and_chr" to "chrome", "and_ff" to "firefox", "ie_mob" to "ie" and "ios_saf" to "safari".
 * - For minor versions or ranges (like ios_saf 12.1-13.3), the oldest version specified is used.
 * - For duplicate targets, only the oldest version is used.
 */

const TARGETS = ['chrome', 'edge', 'firefox', 'ie', 'opera', 'safari', 'samsung']
const ALIASES = { and_chr: 'chrome', and_ff: 'firefox', ie_mob: 'ie', ios_saf: 'safari' }
const REGEX = /([0-9]+)(.*)/

// Convert the browserslist config to an ESBuild compatible array of targets
export default function getBrowserslistTargets() {
  let list = browserslist(browserslist.loadConfig({ path: process.cwd() }))

  // Split names and numbers so we can operate on names or numbers individually
  list = list.map(item => item.split(' '))
  // Filter out bogus versions such as "TP" or "all"
  list = list.filter(([name, number]) => REGEX.test(number))
  // Replace any items with their aliases
  list = list.map(([name, number]) => [ALIASES[name] || name, number])
  // Filter out unsupported targets
  list = list.filter(([name, number]) => TARGETS.includes(name))
  // Replace version ranges with the oldest version in the range
  list = list.map(([name, number]) => [name, number.replace(REGEX, '$1') || number])
  // Filter out all values with the same name but a larger number value
  list = list.filter(([name, number], index, self) => self.findIndex(([otherName, otherNumber]) => otherName === name && otherNumber < number) === -1)
  // Join names and numbers back together
  list = list.map(item => item.join(''))
  // Remove duplicates and sort the list alphabetically
  list = [...new Set(list)].sort()

  return list
}

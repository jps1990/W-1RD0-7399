export interface ObfuscationConfig {
  useNumbers: boolean;
  useSpecialChars: boolean;
  useSymbols: boolean;
  useTitle: boolean;
  fontStyle: string;
  separator: string;
}

export const defaultConfig: ObfuscationConfig = {
  useNumbers: false,
  useSpecialChars: false,
  useSymbols: false,
  useTitle: false,
  fontStyle: 'default',
  separator: '',
};

const fontStyles = {
  default: (text: string) => text,
  gothic: (text: string) => text.split('').map(char => 
    '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'[
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(char)
    ] || char
  ).join(''),
  circles: (text: string) => text.split('').map(char => 
    'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'[
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(char)
    ] || char
  ).join(''),
  magic: (text: string) => text.split('').map(char => 
    '₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎⱫ₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎⱫ'[
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(char)
    ] || char
  ).join(''),
  hearts: (text: string) => text.split('').join('♥'),
  stars: (text: string) => `★${text.split('').join('⋆')}★`,
  elegant: (text: string) => text.split('').map(char => 
    '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'[
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(char)
    ] || char
  ).join(''),
};

export const applyStyle = (text: string, config: ObfuscationConfig): string => {
  let result = text;

  // Apply font style first
  result = fontStyles[config.fontStyle as keyof typeof fontStyles]?.(result) || result;

  // Apply other transformations
  if (config.useNumbers) {
    result = result.replace(/[aeiou]/gi, (match) => {
      const numbers = { a: '4', e: '3', i: '1', o: '0', u: '7' };
      return numbers[match.toLowerCase() as keyof typeof numbers] || match;
    });
  }

  if (config.useSpecialChars) {
    const special = { a: 'α', e: 'є', i: 'ï', o: 'ø', s: '$', t: '†' };
    result = result.replace(/[aeios]/gi, (match) => 
      special[match.toLowerCase() as keyof typeof special] || match
    );
  }

  if (config.useTitle) {
    result = `༺${result}༻`;
  }

  if (config.useSymbols) {
    result = result.split('').join(config.separator);
  }

  return result;
};

export const presets: Record<string, ObfuscationConfig> = {
  'Mystic Circle': {
    useNumbers: false,
    useSpecialChars: false,
    useSymbols: false,
    useTitle: false,
    fontStyle: 'circles',
    separator: '',
  },
  'Magic Runes': {
    useNumbers: false,
    useSpecialChars: false,
    useSymbols: false,
    useTitle: true,
    fontStyle: 'magic',
    separator: '',
  },
  'Love Letters': {
    useNumbers: false,
    useSpecialChars: false,
    useSymbols: true,
    useTitle: false,
    fontStyle: 'default',
    separator: '♥',
  },
  'Star Power': {
    useNumbers: false,
    useSpecialChars: false,
    useSymbols: false,
    useTitle: false,
    fontStyle: 'stars',
    separator: '',
  },
};
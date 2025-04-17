import { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { keywords } from './keywords';

const EXCLUSION_PREFIX = '_';

/**
 * A remark plugin to automatically convert keywords in text nodes to links.
 * If you want to exclude a keyword from being a link, prefix it with an underscore (_).
 */
const autoKeywordPlugin = (options) => {
  return (tree) => {
    visit(tree, 'text', (node: Node & { value: string, processed: boolean }, index: number, parent: Parent) => {
      // Ensure the parent exists, is not a heading, and the node is plain text
      if (
        !parent ||
        parent.type === 'heading' ||
        parent.type === 'link' ||
        parent.type === 'strong' ||
        parent.type === 'tableCell' ||
        node.type !== 'text' ||
        node.processed // Skip nodes that are already processed
      ) {
        return;
      }

      // Create a Map from the keywords object
      const keywordMap = new Map(
        Object.entries(keywords).map(([key, value]) => [key.toLowerCase(), value])
      );

      const words: string[] = node.value.split(/(?<!_)\b|(?<=-)/).filter(Boolean);
      let hasKeyword = false;
      const processedWords: any[] = [];
      let i = 0;

      while (i < words.length) {
        let match = null;
        let matchLength = 0;

        // Check for multi-word keywords starting from the current word
        for (let j = words.length; j > i; j--) {
          const phrase = words.slice(i, j).join(' ').toLowerCase();
          if (keywordMap.has(phrase)) {
            match = phrase;
            matchLength = j - i;
            break;
          }
        }

        if (match) {
          hasKeyword = true;
          processedWords.push({
            type: 'link',
            url: keywordMap.get(match),
            children: [{ type: 'text', value: match, processed: true }],
            data: {
              hProperties: {
                style: 'font-variant: small-caps; text-transform: lowercase; font-size: large;',
              },
            },
            processed: true,
          });
          i += matchLength; // Skip the matched words
        } else {
          const word = words[i];
          if (word.startsWith(EXCLUSION_PREFIX)) {
            const strippedWord = word.slice(1); // Remove the prefix
            processedWords.push({ type: 'text', value: strippedWord, processed: true });
          } else {
            processedWords.push({ type: 'text', value: word, processed: true });
          }
          i++;
        }

        // Add spaces after each processed word (except for the last word)
        if (match) {
          const lastWord = processedWords[processedWords.length - 1].children[0].value;
          if (!/^[.,']$/.test(lastWord)) {
            processedWords[processedWords.length - 1].children[0].value += ' ';
          }
        } else if (i < words.length) {
          const lastWord = processedWords[processedWords.length - 1].value;
          if (!/^[.,']$/.test(lastWord)) {
            processedWords[processedWords.length - 1].value += ' ';
          }
        }
      }

      if (hasKeyword) {
        // Replace the current node with the processed nodes
        parent.children.splice(index, 1, ...processedWords);
      }
    });
  };
};

export default autoKeywordPlugin;

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
    visit(tree, 'text', (node: Node & { value: string, processed: boolean }, index: number, parent: Parent & { name: string }) => {
      // Ensure the parent exists, is not a heading, and the node is plain text
      if (
        !parent ||
        parent.type === 'heading' ||
        parent.type === 'link' ||
        parent.type === 'strong' ||
        (parent.type === 'tableCell' && parent.children.length <= 1 && node.value.split(' ').length <= 1) ||
        parent.name === 'strong' ||
        node.type !== 'text' ||
        node.processed // Skip nodes that are already processed
      ) {
        return;
      }

      // Create a Map from the keywords object
      const keywordMap = new Map(Object.entries(keywords));

      // Split text into words and punctuation while preserving spaces and special characters
      const wordsWithSpaces = node.value.split(/(\s+|[.,!?;:"'(){}\[\]/\\+*])/);
      let hasKeyword = false;
      const processedWords: any[] = [];
      let i = 0;

      while (i < wordsWithSpaces.length) {
        const current = wordsWithSpaces[i];

        if (i % 2 === 1 || /^[.,!?;:"'(){}\[\]/\\+*-]$/.test(current)) {
          // If it's a space or punctuation, add it directly
          processedWords.push({ type: 'text', value: current, processed: true });
          i++;
          continue;
        }

        let match = null;
        let matchLength = 0;

        // Check for multi-word keywords starting from the current word
        for (let j = i; j < wordsWithSpaces.length; j += 2) {
          const phrase = wordsWithSpaces
            .slice(i, j + 1)
            .filter((_, idx) => idx % 2 === 0 || /^[.,!?;:"'(){}\[\]/\\+*]$/.test(wordsWithSpaces[idx]))
            .join(' ');

          if (keywordMap.has(phrase)) {
            // Always prioritize the longest match
            match = phrase;
            matchLength = j - i + 1;
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
          i += matchLength; // Skip the matched words and spaces
        } else {
          const word = current;
          if (word.startsWith(EXCLUSION_PREFIX)) {
            const strippedWord = word.slice(1); // Remove the prefix
            processedWords.push({ type: 'text', value: strippedWord, processed: true });
          } else {
            processedWords.push({ type: 'text', value: word, processed: true });
          }
          i++;
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

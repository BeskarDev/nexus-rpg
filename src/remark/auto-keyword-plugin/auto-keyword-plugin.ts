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
        Object.entries(keywords).map(([key, value]) => [key, value])
      );

      const words: string[] = node.value.split(/\s/);
      let hasKeyword = false;

      const processedWords = words.map((word, i) => {
        // Check if the word starts with exclude prefix to exclude it from being a link
        if (word.startsWith(EXCLUSION_PREFIX)) {
          console.log('Excluding keyword:', word, node.type, parent.type);
          const strippedWord = word.slice(1); // Remove the prefix
          console.log('Stripped word:', strippedWord);
          return { type: 'text', value: i === 0 ? strippedWord : ' ' + strippedWord, processed: true };
        }
        // Ensure we only process plain text nodes, not existing links
        else if (keywordMap.has(word)) {
          hasKeyword = true;
          return {
            type: 'link',
            url: keywordMap.get(word),
            children: [{ type: 'text', value: i === 0 ? word : ' ' + word, processed: true }],
            data: {
              hProperties: {
                style: 'font-variant: small-caps; text-transform: lowercase; font-size: large;',
              },
            },
            processed: true,
          };
        }

        return { type: 'text', value: i === 0 ? word : ' ' + word, processed: true };
      });

      if (hasKeyword) {
        // Replace the current node with the processed nodes
        parent.children.splice(index, 1, ...processedWords);
      }
    });
  };
};

export default autoKeywordPlugin;

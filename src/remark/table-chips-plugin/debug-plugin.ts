import { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';

/**
 * A debugging version of the table chips plugin to see what's happening
 */
const debugTableChipsPlugin = (options = {}) => {
  console.log('Creating table chips plugin instance...');
  return (tree) => {
    console.log('Table chips plugin processing tree...');
    
    // First, let's see all table cells
    visit(tree, 'tableCell', (node: Parent, index: number, parent: Parent) => {
      console.log('Found table cell with children:', node.children?.length || 0);
      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any, i) => {
          if (child.type === 'text' && child.value) {
            console.log(`    Text: "${child.value.substring(0, 50)}..."`);
            if (child.value.includes('fire') || child.value.includes('frost') || child.value.includes('acid')) {
              console.log('    -> FOUND DAMAGE TYPE!');
            }
          }
        });
      }
    });
  };
};

export default debugTableChipsPlugin;
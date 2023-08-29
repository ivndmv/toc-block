import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, RichText, InnerBlocks, store as blockEditorStore } from "@wordpress/block-editor";
//import { useSelect } from '@wordpress/data';

export default function Edit( { attributes, setAttributes, isSelected } ) {
    const MY_TEMPLATE = [
      [ 'core/paragraph', { placeholder: 'Table Of Contents', content: 'Inhaltsverzeichnis' } ],
    ];
    //const blocks = useSelect((select) => select(blockEditorStore).getBlocks());
    const blocks = wp.data.select(blockEditorStore).getBlocks();
    let headings = '<ul>';
      blocks.forEach(block => {
        if (block.name == 'core/heading') { // check for Heading blocks
            const headingsToIds = block.attributes.content.replace(/\s+/g, '-').toLowerCase(); // prepare heading blocks content to be used for Id attribute (replace spaces from heading blocks content with dashes and make it lower case)
            const headingLevel = block.attributes.level;
            wp.data.dispatch(blockEditorStore).updateBlockAttributes(block.clientId, {anchor: headingsToIds});
            headings += `<li class="cot-level-${headingLevel}"><a href="#${headingsToIds}">${block.attributes.content}</a></li>`; // store the heading blocks in the headings variable
        }
      })
      headings += `</ul>`
        setAttributes({ content: headings });
          // const updateFieldValue = ( val ) => {
          // setAttributes( { message: val } );}
          const blockProps = useBlockProps( {
            className: 'cot-block',
          } );
    return (
        <div { ...blockProps }>
            {       
                <Placeholder>
                    <InnerBlocks
                     template={ MY_TEMPLATE }
                     templateLock="all"
                    />
                    <RichText value={ attributes.content }
                    onChange={(content) => setAttributes({content})}
                    withoutInteractiveFormatting={true}
                    isSelected={false}
                    /> 
                </Placeholder>
            }
			</div>
    );
}

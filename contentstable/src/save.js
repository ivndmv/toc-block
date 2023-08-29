import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();
	return <div { ...blockProps }> <InnerBlocks.Content/><RichText.Content value={attributes.content}/> </div>
}
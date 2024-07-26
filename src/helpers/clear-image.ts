export interface clearImageArgs {
	changeImage: HTMLImageElement,
	camera: string,
	valueNameCreatGroup: HTMLInputElement,
	valueDescriptionCreatGroup: HTMLInputElement,
	fileFoto: HTMLInputElement
}


export const clearImage = (args: clearImageArgs, src: Object) => {
	const { changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto } = args

	fileFoto.value = '';

	(src as any).value = '';

	changeImage.src = camera;

	valueNameCreatGroup.value = '';

	valueDescriptionCreatGroup.value = '';
}
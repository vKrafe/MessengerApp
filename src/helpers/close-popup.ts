import { clearImage } from "../helpers/clear-image";

export interface closePopupArgs {
	activePopup: Element,
	changeImage: HTMLImageElement,
	camera: string,
	valueNameCreatGroup: HTMLInputElement,
	valueDescriptionCreatGroup: HTMLInputElement,
	fileFoto: HTMLInputElement
}

export function closePopup(args: closePopupArgs, src: Object) {
	const { activePopup, changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto } = args

	activePopup.classList.remove('open')

	clearImage({ changeImage, camera, valueNameCreatGroup, valueDescriptionCreatGroup, fileFoto }, src)
}
import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = (props) => {
  const { imageToCrop, onImageCropped } = props;
  const [imageRef, setImageRef] = useState();
  const [cropConfig, setCropConfig] = useState(
    // default crop config
    {
      unit: "%",
      width: 30,
      aspect: 1,
    }
  );

  const cropImage = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = getCroppedImage(imageRef, crop);
      onImageCropped(croppedImage);
    }
  };

  const getCroppedImage = (sourceImage, cropConfig) => {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );
    return canvas.toDataURL("image/jpeg");
  };

  return (
    <>
      <ReactCrop
        src={imageToCrop}
        crop={cropConfig}
        ruleOfThirds
        onImageLoaded={(imageRef) => setImageRef(imageRef)}
        onComplete={(cropConfig) => cropImage(cropConfig)}
        onChange={(cropConfig) => setCropConfig(cropConfig)}
        crossorigin="anonymous" // to avoid CORS-related problems
      />
    </>
  );
};

export default ImageCropper;

/**
    * @param  {string(base64)} imgBase64
    * @param  {Number} maxWidth 
    * @param  {Number} maxHeight 
    * @return {string(base64)}  
*/
function resizebase64(imgBase64, maxWidth, maxHeight){

    return new Promise((resolve, reject) => {

        // Create and initialize two canvas
        var canvas 			= document.createElement("canvas");
        var ctx 			= canvas.getContext("2d");
        var canvasCopy 		= document.createElement("canvas");
        var copyContext 	= canvasCopy.getContext("2d");

        // Create original image
        var img = new Image();
        img.src = imgBase64;

        img.onload = () => {

            // Determine new ratio based on max size
            var ratio = 1;
            if(img.width > maxWidth)
            ratio = maxWidth / img.width;
            else if(img.height > maxHeight)
            ratio = maxHeight / img.height;

            // Draw original image in second canvas
            canvasCopy.width 	= img.width;
            canvasCopy.height 	= img.height;
            copyContext.drawImage(img, 0, 0);

            // Copy and resize second canvas to first canvas
            canvas.width 	= img.width * ratio;
            canvas.height 	= img.height * ratio;

            ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

            resolve(canvas.toDataURL("image/jpeg"));

        };

        img.onerror = reject;

    });

}

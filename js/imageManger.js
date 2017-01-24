
/*
	Defines an array of images, the firs one should be
	the preview image (512x256).
*/	
var imgDb = 
[
	// First row
	["img/andrea-fayos-character_portada.jpg","img/andrea-fayos-character4.jpg","img/andrea-fayos-character2.jpg","img/andrea-fayos-character.jpg","img/andrea-fayos-character3.jpg"],
	["img/andrea-fayos-creature_Portada.jpg","img/andrea-fayos-fox-illustration-finished2.jpg","img/andrea-fayos-creature.jpg","img/andrea-fayos-creature2.jpg","img/andrea-fayos-creature3.jpg","img/andrea-fayos-creature4.jpg","img/andrea-fayos-creature5.jpg"],
	["img/andrea-fayos-prop_portada.jpg","img/andrea-fayos-prop.jpg","img/andrea-fayos-prop2.jpg"],
	["img/andrea-fayos_doll_portada.jpg","img/andrea-fayos-final-thumb-corrected2.jpg"],
	
	// Second row
	["img/andrea-fayos-pirate-illustration_portada.jpg","img/andrea-fayos-pirate-illustration-update.jpg"],
	["img/andrea-fayos-siren_portada.jpg","img/andrea-fayos-siren-thumbnailsiren.jpg","img/andrea-fayos-siren-color-thumbs.jpg","img/andrea-fayos-siren-final8.jpg","img/andrea-fayos-siren-facestudy.jpg","img/andrea-fayos-siren-expressions.jpg","img/andrea-fayos-siren-poses.jpg","img/andrea-fayos-siren-turnaround.jpg","img/andrea-fayos-siren-sculpture.jpg"],
	["img/andrea-fayos-kirin_portada.jpg","img/andrea-fayos-kirinfullbody-notmerged.jpg"],
	["img/andrea-fayos-acrobat_Portada.jpg","img/andrea-fayos-acrobat.jpg"]
];

var imgDbTitle = 
[
	"MIKO","KITSUNE","STAFF","DOLL","PIRATE","SIREN","KIRIM","ACROBAT"
];

// Max number of process
var kNumProcess = 8;
// Number of colums for each row
var kNumColumns = 4;

// Holds the current opened (modal img)
// curImg = img.id
var curImg = 0;
// How many images did we spawn?
var spawnImgs = 0;

/*
	Adds all the images to the DOM
*/
function initImgs() 
{
	// Div and image definitions
	var divDef = "<div class = 'w3-row' style = 'margin:auto;width: 90%'>";
	var divEnd = "</div>";
	var imgDivDef = "<div class = 'w3-col w3-quarter'>";
	var imgDivEnd = "</div>";
	var imgStyle = "style = 'width:100%; padding: 7px' onClick = onClickPreview(this)>";

	// Get the DOM element we are going to fill
	var imgContainer = document.getElementById("imgContainer");

	// We will be makin rows of kNumColumns
	// rows = imgDb.length / kNumColumns
	var rowCnt = imgDb.length / kNumColumns;

	// Check if we have an extra incomplete row
	var rowRemaind = imgDb.length % kNumColumns;
	
	// For each row ...
	var lastId = -1;
	if(rowCnt > 0)
	{
		var remHack = rowCnt - 1;
		if(rowRemaind == 0) remHack = rowCnt;
		for(var r = 0; r < remHack; r++)
		{
			imgContainer.innerHTML += divDef;

			// For each image ...
			for(var i = 0; i < kNumColumns; i++)
			{
				lastId = (i + kNumColumns * r);
				var imgId = "id = '" + lastId + "'";
				var img = "<img class = 'pImg' src = '" + imgDb[lastId][0] + "'" + imgId + imgStyle;
				imgContainer.innerHTML += imgDivDef + img + imgDivEnd;
				spawnImgs++;
			}

			imgContainer.innerHTML += divEnd;
		}
	}

	// Remainder ...
	if(rowRemaind > 0)
	{
		imgContainer.innerHTML += divDef;
		for(var i = 0; i < rowRemaind; i++)
		{
			lastId = lastId + 1;
			var imgId = "id = '" + lastId + "'";
			var img = "<img src = '" + imgDb[lastId][0] + "'" + imgId + imgStyle;
			imgContainer.innerHTML += imgDivDef + img + imgDivEnd;
			spawnImgs++;
		}
		imgContainer.innerHTML += divEnd;
	}
}

/*
	Clicks on a preview image
*/
function onClickPreview(img)
{
	document.getElementById('modal').style.display='block';
	var id = img.id;
	curImg = id;

	document.getElementById('modalTitle').innerHTML = imgDbTitle[id];

	// For each image in this image item
	// it starts on 1 as 0 is the preview
	for(var i = 1; i <= kNumProcess; i++)
	{
		var pId = "p" + i;
		var ele = document.getElementById(pId);
		
		// Disable non-used images
		if( i > imgDb[id].length - 1)
		{
			ele.style.display = "none";
		}

		// Enable images used
		else
		{
			if(ele)
			{
				ele.style.display = "initial";
				ele.src = imgDb[id][i];
			}
		}
	}
}

/*
	Close the modal window (if it is opened), we 
	should check if we are clicking an image or not
*/
function closeModal(modal)
{
	if(modal.style.display != "none")
	{
		//modal.style.display	= "none";
	}
}

function changeImg(mod)
{
	// Change cur image and loop
	curImg = parseInt(curImg) + mod;
	if(curImg > spawnImgs - 1)curImg = 0;
	if(curImg < 0)curImg = spawnImgs - 1;

	var image = document.getElementById(curImg);
	onClickPreview(image);
}

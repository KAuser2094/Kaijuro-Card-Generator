document.getElementById("cardForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var cardImage = document.getElementById("cardImage").files[0];
  var cardClass = document.getElementById("cardClass").value;
  var cardRarity = document.getElementById("cardRarity").value;
  var cardName = document.getElementById("cardName").value;
  var cardWeight = document.getElementById("cardWeight").value;
  var cardGroup = document.getElementById("cardGroup").value;
  var cardPower = document.getElementById("cardPower").value;
  var cardEffect = document.getElementById("cardEffect").value;

  const CARD_WIDTH = 300;
  const CARD_HEIGHT = 400;

  // Determine color and text based on card class
  var classColor;
  switch (cardClass) {
    case "Darkness":
      classColor = "purple";
      break;
    case "Nature":
      classColor = "green";
      break;
    case "Fire":
      classColor = "red";
      break;
    case "Water":
      classColor = "blue";
      break;
    case "Light":
      classColor = "yellow";
      break;
    case "Neutral":
      classColor = "darkgrey";
      break;
    default:
      classColor = "black"; // Default color
  }

  // Determine color based on card rarity
  var rarityColor;
  switch (cardRarity) {
    case "Common":
      rarityColor = "#f2f2f2"; // Very light grey
      break;
    case "Rare":
      rarityColor = "blue"; // Same blue as Water
      break;
    case "Epic":
      rarityColor = "purple"; // Same purple as Darkness
      break;
    case "Legendary":
      rarityColor = "orange";
      break;
    default:
      rarityColor = "black"; // Default color
  }

  // Load image into Fabric.js
  var canvas = new fabric.Canvas('generatedCanvas', { width: CARD_WIDTH, height: CARD_HEIGHT });
  fabric.Image.fromURL(URL.createObjectURL(cardImage), function(img) {
    var scaleX = CARD_WIDTH / img.width;
    var scaleY = CARD_HEIGHT / img.height;
    var scale = Math.min(scaleX, scaleY);

    // Scale the image proportionally
    img.scale(scale);

    // Yes the scaling doesn't work -_-
    
    // Position the image at the center of the canvas
    img.set({
      left: 0,
      top: 0
    });

    // Add the image to the canvas
    canvas.add(img);

    // Add a rectangle at the top left corner with the specified class color, rounded corners, and translucency
    var classRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: 45,
      height: 90,
      fill: classColor,
      originX: 'left',
      originY: 'top',
      rx: 10, // Rounded corners
      ry: 10, // Rounded corners
      opacity: 0.7 // Translucency
    });
    var classText = new fabric.Text(cardWeight, {
      left: classRect.left + classRect.width / 2,
      top: classRect.top + classRect.height / 2,
      fill: 'white',
      fontSize: 30,
      originX: 'center',
      originY: 'center'
    });
    var classGroup = new fabric.Group([classRect, classText], {
      left: 0,
      top: 0
    });
    canvas.add(classGroup);

    // Add a rectangle for the card name
    var nameRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: CARD_WIDTH - classRect.width, // Remaining width of the card
      height: 35,
      fill: rarityColor, // Use rarity color
      originX: 'left',
      originY: 'top',
      rx: 10, // Rounded corners
      ry: 10, // Rounded corners
      opacity: 0.7 // Translucency
    });
    var nameText = new fabric.Text(cardName, {
      left: nameRect.left + nameRect.width / 2,
      top: nameRect.top + nameRect.height / 2,
      fill: 'white',
      fontSize: 25,
      originX: 'center',
      originY: 'center'
    });
    var nameGroup = new fabric.Group([nameRect, nameText], {
      left: classRect.width,
      top: 0
    });
    canvas.add(nameGroup);

    // Add a rectangle for the card group if not empty
    if (cardGroup) {
      var groupRect = new fabric.Rect({
        left: classRect.width,
        top: nameRect.height,
        width: CARD_WIDTH - classRect.width,
        height: 35,
        fill: 'darkgrey',
        originX: 'left',
        originY: 'top',
        rx: 10,
        ry: 10,
        opacity: 0.7
      });
      var groupText = new fabric.Text(cardGroup, {
        left: groupRect.left + groupRect.width / 2,
        top: groupRect.top + groupRect.height / 2,
        fill: 'white',
        fontSize: 25,
        originX: 'center',
        originY: 'center'
      });
      var groupGroup = new fabric.Group([groupRect, groupText], {
        left: classRect.width,
        top: nameRect.height
      });
      canvas.add(groupGroup);
    }

    var currentBottom = 0;
    // Add a rectangle for the card power if not empty
    if (cardPower) {
      const POWER_RECT_HEIGHT = 70
      var powerRect = new fabric.Rect({
        left: 0,
        top: CARD_HEIGHT - POWER_RECT_HEIGHT,
        width: CARD_WIDTH,
        height: POWER_RECT_HEIGHT,
        fill: 'darkgrey',
        originX: 'left',
        originY: 'top',
        rx: 10,
        ry: 10,
        opacity: 0.7
      });
      var powerText = new fabric.Text(cardPower, {
        left: powerRect.left + powerRect.width / 2,
        top: powerRect.top + powerRect.height / 2,
        fill: 'white',
        fontSize: 60,
        originX: 'center',
        originY: 'center',
        // fontWeight: 'bold'
      });
      var powerGroup = new fabric.Group([powerRect, powerText], {
        left: 0,
        top: CARD_HEIGHT - POWER_RECT_HEIGHT
      });
      canvas.add(powerGroup);
      currentBottom += POWER_RECT_HEIGHT + 5;
    }

    // Add a rectangle for the card effect if not empty
    if (cardEffect) {
      var lines = cardEffect.split('\n').length; // Number of lines of text in cardEffect
      var heightPerLine = 30;
      var effectRect = new fabric.Rect({
        left: 0,
        top: 0,
        width: CARD_WIDTH,
        height: lines * heightPerLine,
        fill: 'darkgrey',
        originX: 'left',
        originY: 'top',
        rx: 10,
        ry: 10,
        opacity: 0.7
      });
      var effectText = new fabric.Text(cardEffect, {
        left: effectRect.left + effectRect.width / 2,
        top: effectRect.top + effectRect.height / 2,
        fill: 'white',
        fontSize: 25,
        originX: 'center',
        originY: 'center',
        fontWeight: 'bold'
      });
      var effectGroup = new fabric.Group([effectRect, effectText], {
        left: 0,
        top: CARD_HEIGHT - currentBottom - lines*heightPerLine
      });
      canvas.add(effectGroup);
    }

    document.getElementById("cardOutput").style.display = "block"; // Show the generated card
  });
});

/**
 * Created by Daniel Schlaug on 2018-01-29.
 */

export function createDishThumbnail({
                                        document: document,
                                        title: title,
                                        dishID: dishID,
                                        imageURL: imageURL,
                                        cost: cost
                                    }) {

    let liElement = document.createElement("li");
    liElement.classList.add('dish');
    //liElement.classList.add('');
    if (dishID !== undefined) {
        liElement.addEventListener('click', () => {
            window.location.hash = '#dish-details@' + dishID;
        });
    }

    let thumbnailBox = document.createElement('div');
    thumbnailBox.classList.add('thumbnail');
    liElement.appendChild(thumbnailBox);



    if (imageURL) {
        let dishImageElement = document.createElement("img");
        dishImageElement.src = imageURL;
        dishImageElement.classList.add('dishImg');
        thumbnailBox.appendChild(dishImageElement);
    }

    let dishTitleElement = document.createElement("label");
    dishTitleElement.classList.add('capitaliseLabel');
    dishTitleElement.classList.add('dishTitle');
    dishTitleElement.textContent = title;
    thumbnailBox.appendChild(dishTitleElement);

    if (cost) {
        let priceLabel = document.createElement("label");
        priceLabel.classList.add("currency");
        priceLabel.textContent = cost;
        thumbnailBox.appendChild(priceLabel);
    }

    return liElement;
}
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
    liElement.classList.add('thumbnail');
    if (dishID !== undefined) {
        liElement.addEventListener('click', () => {
            window.location.hash = '#dish-details@' + dishID;
        });
    }

    if (imageURL) {
        let dishImageElement = document.createElement("img");
        dishImageElement.src = imageURL;
        dishImageElement.classList.add('dish');
        liElement.appendChild(dishImageElement);
    }

    let dishTitleElement = document.createElement("label");
    dishTitleElement.classList.add('capitaliseLabel');
    dishTitleElement.textContent = title;
    liElement.appendChild(dishTitleElement);

    if (cost) {
        let priceLabel = document.createElement("label");
        priceLabel.classList.add("currency");
        priceLabel.textContent = cost;
        liElement.appendChild(priceLabel);
    }

    return liElement;
}
/**
 * Created by Daniel Schlaug on 2018-01-28.
 */
export class View {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }

    get active() {
        return !this.containerElement.classList.contains("inactive");
    }
    set active(shouldBeActive) {
        if (shouldBeActive) {
            this.connectListeners && this.connectListeners();
            this.containerElement.classList.remove("inactive");
        } else {
            this.disconnectListeners && this.disconnectListeners();
            this.containerElement.classList.add("inactive");
        }
    }
}
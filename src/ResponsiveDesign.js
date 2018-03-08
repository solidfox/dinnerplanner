/**
 * Created by Daniel Schlaug on 2018-02-13.
 */

export default class ResponsiveDesign {
    static get sizeClasses() {
        return {
            compact: "compact",
            normal: "normal"
        }
    }

    static sizeClass(width) {
        if (width < 786) {
            return ResponsiveDesign.sizeClasses.compact;
        } else {
            return ResponsiveDesign.sizeClasses.normal;
        }
    }
}
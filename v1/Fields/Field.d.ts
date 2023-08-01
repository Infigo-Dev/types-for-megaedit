/**
 * This defines the common base field interface shared among all types.
 * 
 * @module Field / Base Field
 */

/**
 * The field type is used to identify the type of a field and control the behavior of the field.
 */
declare enum FieldType {
    /**
     * Image fields are display an image. There are two separate usage modes for image fields:
     * - cliparts: used to display a clipart image (image as part of the clipart category)
     * - media: used to display an image uploaded by the user
     */
    ImageField = 'ImageField',
    /**
     * Text fields are used to display text. The text field has a default format, but the text itself has rich text capabilities.
     */
    TextField = 'TextField',
    /**
     * Path fields can be used to render a path. Path fields are generated by the system or scripts and do not have a user interface to manipulate.
     */
    PathField = 'PathField',
    /**
     * A custom field is a new field type defined by the script. There can be many different custom fields and the script can define the behaviour, appareance and configuration options of the field.
     */
    CustomField = 'CustomField'
}

/**
 * The mode defines how to move a field on the z-order of the canvas in relation to the other elements.
 */
declare enum ReArrangeMode {
    /**
     * Move the field one step forward (towards the foreground).
     */
    MoveFront = 'MoveFront',
    /**
     * Move the field one step back (towards the background).
     */
    MoveBack = 'MoveBack',
    /**
     * Move the field to the front of the canvas. This will result in the top most field.
     */
    MoveToFront = 'MoveToFront',
    /**
     * Move the field to the back of the canvas. This will result in the bottom most field.
     */
    MoveToBack = 'MoveToBack'
}

/**
 * Allowed way to move a field on the canvas.
 */
declare enum FieldMovementMode {
    /**
     * The field can be moved in any direction freely.
     */
    Free = 'Free',
    /**
     * The field cannot be moved at all and is locked in place.
     */
    Fixed = 'Fixed',
    /**
     * The field can only be moved horizontally. The vertical position is fixed.     
     */
    Horizontal = 'Horizontal',
    /**
     * The field can only be moved vertically. The horizontal position is fixed.
     */
    Vertical = 'Vertical'
}

/**
 * The border type defines if and how the border is being rendered around the field.
 */
declare enum BorderType {
    /**
     * No border (the default setting).
     */
    None = 'None',
    /**
     * A solid border around the field outlines.
     */
    Solid = 'Solid',
    /**
     * An outline border is drawn with two strokes - one around the field outlines, the other with a distance to the field outlines.
     */
    Outline = 'Outline',
    /**
     * The distance border is a single stroke with a distance to the field outlines.
     */
    Distance = 'Distance'
}

/**
 * Defines the settings for a field border.
 */
type FieldBorder = {
    /**
     * Flag to control if a background color should be set.
     */
    applyBackground: boolean;
    /**
     * The background color to use. This can be any valid MegaEdit color value.
     */
    backgroundColor: string;
    /**
     * The background opacity - a value in the range of [0-1]. 0 means fully transparent, 1 means fully opaque.
     */
    backgroundOpacity: number;
    /**
     * The border color to use. This can be any valid MegaEdit color value.
     */
    borderColor: string;
    /**
     * The border opacity - a value in the range of [0-1]. 0 means fully transparent, 1 means fully opaque.
     */
    borderOpacity: number;
    /**
     * The border radius in points. This is the radius of the rounded corners of the field. A value of 0 means no rounded corners.
     */
    borderRadius: number;
    /**
     * The stroke with for borders used for outline and distance border styles.
     */
    borderStrokeWidth: number;
    /**
     * The border style to use.
     */
    borderStyle: BorderType;
    /**
     * The border width for solid borders and used for the distance for the other two border styles in points.
     */
    borderWidth: number;
}

/**
 * Defines the settings for a field shadow.
 */
type FieldShadow = {
    /**
     * The blur factor to use for the shadow in the range of [0,10]. A value of 0 means no blur. The higher the value, the more blur is applied. A good default value is 2.
     */
    shadowBlur: number;
    /**
     * The shadow color to use. This can be any RGB value.
     */
    shadowColor: string;
    /**
     * The offset of the shadow in points. The shadow is offset from the field in the x and y direction.
     */
    shadowOffsetX: number;
    /**
     * The offset of the shadow in points. The shadow is offset from the field in the x and y direction.
     */
    shadowOffsetY: number;
    /**
     * The opacity of the shadow in the range of [0,1]. A value of 0 means no shadow. The higher the value, the more opaque the shadow is.
     */
    shadowTransparency: number; 
}

/**
 * Definition of save options to use during the save operation.
 */
type SaveOptions = {
    /**
     * Flag to control if an undo entry should be added. This is useful if the script is used to perform multiple changes.
     */
    addUndo: boolean;
    /**
     * Flag to control if text flow should be triggered after the save. This is useful if the text flow should not be triggered automatically for performance reasons and subsequent changes are necessary.
     */
    handleTextFlow: boolean;
}

/**
 * The issues object holds flags about the current health status of the field.
 * Issues are being shown visually within the editor and a warning/error is triggered before adding the item to the cart.
 */
interface BaseFieldIssues {
    /**
     * Flag to control if any issue should be ignored. If this is set to true, the field will be treated as if it has no issues.
     */
    ignoreIssues: boolean;
    /**
     * Flag to control if the field has positional issues. A positional issue is if parts of the field are outside the canvas area (excluding the bleed).
     * This gets auto updated when the field is moved or resized.
     */
    hasPositionIssues: boolean;
    /**
     * Flag to control for custom issues. Via scripting, you can add custom issues to a field. This flag is set to true if any custom issue is set.
     */
    customIssues: boolean;
}

/**
 * The restrictions object holds flags about the restrictions configured against the field. Restrictions control what manipulations are possible within the editor UI.
 */
interface BaseFieldRestrictions {
    /**
     * Flag to control if the selected field can show the popup dialog specific to that field type.
     */
    doNotOpenPopup: boolean;
    /**
     * Flag to control if the field should be added to the print output. If this flag is set, the field would not appear in the output even if the field is visible.
     * This flag will also control the preview - and that means that it would also mean the field would not show up there either.
     */
    doNotPrint: boolean;
    /**
     * Only relevant if {@link doNotPrint} is set to true. This flag controls if the field should be shown in the preview despite 'doNotPrint' being set to true.
     */
    showNoPrintInPreview: boolean;
    /**
     * Flag to control if the field can be rotated.
     */
    allowRotation: boolean;
    /**
     * Flag to control if the z-index of the field can be adjusted.
     */
    allowZOrderArrangement: boolean;
    /**
     * Flag to control if the field can be deleted (either with the UI or the 'Delete' key).
     */
    doNotDelete: boolean;
    /**
     * Flag to control if the field can be resized.
     */
    allowSizeChange: boolean;
    /**
     * The movement mode controls how the field can be moved.
     */
    movementMode: FieldMovementMode;
    /**
     * Flag to control if the field can be selected. If disabled, the field will not interact with the mouse and cannot be selected. Fields below the current field can then be interacted with.
     */
    doNotSelect: boolean;
    /**
     * Flag to control if the field should be used when layouts are applied. If the field does not participate, the contents of the field are ignored when transfering data. When layouts are generated, those fields will be ignored too.
     */
    doNotParticipateOnLayout: boolean;
    /**
     * The editor will establish the default zoom level for all fields to ensure everything is visible initially. This flag allows to ignore the current field when calculating the zoom level.
     */
    skipPageZoom: boolean;
}

/**
 * The UI options control the UI aviailable in the editor in relation to this field. Most of it will be used for the field specific dialog options.
 */
interface BaseFieldUiOptions {        
    /**
     * Do not show the border options in the UI.
     */
    hideBorder: boolean;
    /**
     * Do not show the shadow options in the UI.
     */
    hideShadow: boolean;
    /**
     * Show the background color option in the UI.
     */
    showBackgroundColorOption: boolean;
    /**
     * Flag to control if the editor would show snap lines and allow to snap to this field.
     */
    snapToObject: boolean;  
    /**
     * The editor can show a help text based on configuration settings. There are generic help texts for each field type, but also custom help texts can be defined for individual fields.
     */
    helpText: string;
}

/**
 * The base field defines properties and functions available to all field types. There is no instance of a base field, all fields are always of a sub type.
 */
interface BaseField {
    /**
     * The id of the field (GUID) as a unique identifier.
     */
    readonly id: string;
    /**
     * The type of the field
     */
    readonly type: FieldType;
    /**
     * The area of the field on the canvas as defined by the parameter. If the actual position is required, have a look at {@link FieldBoundingBox} and {@link GetBoundingBox}.
     */
    readonly area: {
        /**
         * The x coordinate of the field on the canvas. Value in points.
         */
        x: number;
        /**
         * The y coordinate of the field on the canvas. Value in points.
         */
        y: number;
        /**
         * The width of the field on the canvas. Value in points.
         */
        w: number;
        /**
         * The height of the field on the canvas. Value in points.
         */
        h: number;
        /**
         * The rotation of the field on the canvas. Value in degrees. The rotation center is the top left coordinate.
         */
        rotation: number;
        /**
         * The index of the page this field is on. The index is zero based.
         */
        readonly page: number;
        /**
         * For spread setups only this is the index of the sub page. The index is zero based.
         * - 0: left page
         * - 1: right page
         */
        readonly subPage: number;
        /**
         * The z-index of the field on the page. The z-index defines the order of the fields on the page. The higher the z-index, the more on top the field is.
         */
        readonly zIndex: number;
        /**
         * Flag to control if the field is visible or hidden. Hidden fields will not show in the UI and not on the output.
         */
        hidden: boolean;
    };
    /**
     * The info or meta data details of the field.
     */
    readonly info: {
        /**
         * The name of the field. By default empty, this can be used to provide semantic information to the field and will be used for logging, errors and debugging, but can also be helpful for field retrieval.
         * The name of a field doesn't have to be unique and duplicates can happen.
         */
        name: string;
        /**
         * The list of tags. Tags can be also used to retrieve fields and store additional meta data against the field. Note that a tag cannot contain the '|' character.
         */
        tags: string[];
        /**
         * The sequence is used for auto mapping values when applying layouts. In order to determine which field of the new layout should be populated with the value of which field in the old layout the sequence is used.
         * This is independent of creation order or z-index and allows to semantically control this. When generating fields the sequence is automatically set as an incrementing number.
         */
        sequence: number;
        /**
         * The custom data is an arbitrary object which can be used to store additional information against the field. This is for scripting usage only. Note that there is only a single custom data object per field. So multiple scripts would have to consider a merge or overwrite strategy.
         */
        customData: string;
    };
    /**
     * The issues object holds flags about the current health status of the field.
     * Issues are being shown visually within the editor and a warning/error is triggered before adding the item to the cart.
     */
    readonly issues: BaseFieldIssues;
    /**
     * The restrictions object holds flags about the restrictions configured against the field. Restrictions control what manipulations are possible within the editor UI.
     */
    readonly restrictions: BaseFieldRestrictions;
    /**
     * The UI options control the UI aviailable in the editor in relation to this field. Most of it will be used for the field specific dialog options.
     */
    readonly uioptions: BaseFieldUiOptions;
    /**
     * The shadow object defines the field shadow settings. This is available for all field types except path fields.
     */
    shadow: FieldShadow | null;
    /**
     * The border object defines the field border settings - which includes not only the border itself but also the background fill of the field. This is available for all field types except path fields.
     */
    border: FieldBorder | null;

    /**
     * Rearranges the field on the canvas by adjusting the z-index in relation to the other fields.
     * Updates the field properties.
     * @param mode The z-index change defined by the mode.
     */
    ReArrange(mode: ReArrangeMode): void;
    /**
     * Refreshes the field with the latest parameters as used within the editor. As the script instance is decoupled, changes to the field object are not automatically reflected in the script instance.
     * Use the refresh method to ensure the field object is up to date.
     */
    Refresh(): void;
    /**
     * Save the changes of the script object back into the editor. This will update the field with the latest changes, but not every change will be reflected directly in the UI.
     * Some changes would require reinitialization.
     * 
     * Note that not all properties can be saved with this function:
     * - page: currently cannot be changed, but fields can be copied to a new location and then the original can be deleted
     * - z-index: use the rearrange function to change the z-index
     * 
     */
    Save(): void;
    /**
     * Saves the changes of the script back into the editor, while allowing to control certain actions via a save options object. For further information of what can be saved {@link Save}
     * @param options The save options to use for this operation.
     */
    SaveWithOptions(options: SaveOptions): void;        
    /**
     * Converts a relative field position (a position within the field from the top/left corner of the field without the rotation applied) to a global location on the canvas.
     * @param point The point as the relative position.
     * @returns The converted point as the global location.
     */
    ConvertRelativeFieldPositionToGlobalLocation(point: Point): Point;
    /**
     * Little helper to calculate the field bounding box - this includes also information about the location of all 4 corner points of the field on teh canvas.
     * @returns The bounding box of the field. This is the area the field occupies on the canvas.
     */
    GetBoundingBox(): FieldBoundingBox;   
}
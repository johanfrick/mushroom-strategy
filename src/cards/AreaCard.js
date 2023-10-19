import {AbstractCard} from "./AbstractCard";

/**
 * Area Card Class
 *
 * Used to create a card for an entity of the area domain.
 *
 * @class
 * @extends AbstractCard
 */
class AreaCard extends AbstractCard {
  /**
   * Default options of the card.
   *
   * @type {areaCardOptions}
   * @private
   */
  #defaultOptions = {
    type: "custom:mushroom-template-card",
    primary: undefined,
    icon: "mdi:texture-box",
    icon_color: "blue",
    tap_action: {
      action: "navigate",
      navigation_path: undefined,
    },
    hold_action: {
      action: "none",
    },
  };

  /**
   * Class constructor.
   *
   * @param {areaEntity} area The area entity to create a card for.
   * @param {areaCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(area, options = {}) {
    super(area);
    if (options.use_type_area) {
      this.#defaultOptions.type = "area";
      this.#defaultOptions.area = area.area_id;
      this.#defaultOptions.navigation_path = area.area_id;
    } else {
      this.#defaultOptions.primary = area.name;
      this.#defaultOptions.tap_action.navigation_path = area.area_id ?? area.name;
    }

    // Set card type to default if a type "default" is given in strategy options.
    if (options.type === "default") {
      options.type = this.#defaultOptions.type;
    }

    this.mergeOptions(
        this.#defaultOptions,
        options,
    );

    // Override the area's name with a custom name, unless a custom primary text is set.
    if (!options.primary && options.name) {
      this.options.primary = options.name;
    }
  }
}

export {AreaCard};

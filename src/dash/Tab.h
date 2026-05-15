#pragma once

#include "Defines.h"

class ESPDash;

namespace dash {

  enum class Icon : uint8_t {
    UNASSIGNED_ICON = 0,
    HOME_ICON,
    COG_ICON,
    SUN_ICON,
    MOON_ICON,
    SUN_MOON_ICON,
    DATABASE_ICON,
    COMPUTER_ICON,
    ACTIVITY_ICON,
    ALARM_ICON,
    AUDIO_ICON,
    JOYSTICK_ICON,
  };

  class Tab {
    public:
      Tab(ESPDash& dashboard, const char* name, Icon icon = Icon::UNASSIGNED_ICON);

      uint16_t id() const { return _id; }
      const char* name() const { return _name; }
      Icon icon() const { return _icon; }

      void toJson(const JsonObject& json) const {
        json["id"] = _id;
        json["n"] = _name;
        json["i"] = static_cast<uint8_t>(_icon);
      }

    private:
      static uint16_t nextId() {
        static uint16_t _ids = 1;
        return _ids++;
      }
      const uint16_t _id;
      const char* _name;
      Icon _icon;
  };

} // namespace dash

#pragma once

#include "Component.h"
#include "Tab.h"

namespace dash {
  class Widget : public Component {
    public:
      Widget(const char* name) : Component(name) {}
      Widget(ESPDash& dashboard, const char* name) : Component(dashboard, name) {}

      virtual ~Widget() {
      }

      // component type (for UI rendering)
      virtual const char* type() const = 0;

      void setTab(const Tab& tab) { _tabId = tab.id(); }
      uint16_t tabId() const { return _tabId; }

      virtual void toJson(const JsonObject& json, bool onlyChanges) const override {
        Component::toJson(json, onlyChanges);
        if (!onlyChanges) {
          json["t"] = type();
          json["tab"] = _tabId;
        }
      }

    private:
      uint16_t _tabId = 0; // 0 = Overview (default)
  };
} // namespace dash

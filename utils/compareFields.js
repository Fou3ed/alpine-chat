export function compareFields(a, b) {
    switch (a.field_name.toLowerCase()) {
      case "first name":
        return -1;
      case "last name":
        return b.field_name.toLowerCase() === "first name" ? 1 : -1;
      case "country":
        return ["first name", "last name"].includes(b.field_name.toLowerCase())
          ? 1
          : -1;
      case "phone":
        return ["first name", "last name", "country"].includes(
          b.field_name.toLowerCase()
        )
          ? 1
          : -1;
      default:
        return ["first name", "last name", "country", "phone"].includes(
          b.field_name.toLowerCase()
        )
          ? 1
          : 0;
    }
  }
  
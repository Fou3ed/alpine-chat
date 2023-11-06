export function compareFields(a, b) {
  const aFieldType = getValue(a.field_type.toString())
  const bFieldType = getValue(b.field_type.toString())

return aFieldType < bFieldType ? -1 : (aFieldType > bFieldType ? 1 : 0)

}

function getValue(a){
  switch(parseInt(a)){

    case 13 : return 1
    case 10 : return 2 
    case 11 : return 3 
    case 8 : return 4
    case 7 : return 5
    case 6 : return 6
    default : return 7

  }

}

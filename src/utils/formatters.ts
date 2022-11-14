type Dates = {
  [key: string]: number;
};

function joinObj(obj: {}, separator: string) {
  const out = [];
  for (const k in obj) {
    out.push(k);
  }
  return out.join(separator);
}

export function dateToString(inDate: string, formatString = 'YYYY-MM-DD') {
  const formatDate = new Date(inDate);

  const dateObject: Dates = {
    M: formatDate.getMonth() + 1,
    d: formatDate.getDate(),
    D: formatDate.getDate(),
    h: formatDate.getHours(),
    m: formatDate.getMinutes(),
    s: formatDate.getSeconds(),
    y: formatDate.getFullYear(),
    Y: formatDate.getFullYear(),
  };
  // Build Regex Dynamically based on the list above.
  // Should end up with something like this "/([Yy]+|M+|[Dd]+|h+|m+|s+)/g"
  const dateMatchRegex = joinObj(dateObject, '+|') + '+';
  const regEx = new RegExp(dateMatchRegex, 'g');
  const outputDate = formatString.replace(regEx, function (formatToken: any) {
    const target = formatToken.slice(-1) as string;
    const datePartValue = dateObject[target];
    let tokenLength = formatToken.length;

    // A conflict exists between specifying 'd' for no zero pad -> expand to '10' and specifying yy for just two year digits '01' instead of '2001'.  One expands, the other contracts.
    // so Constrict Years but Expand All Else
    if (formatToken.indexOf('y') < 0 && formatToken.indexOf('Y') < 0) {
      // Expand single digit format token 'd' to multi digit value '10' when needed
      tokenLength = Math.max(
        formatToken.length,
        datePartValue.toString().length
      );
    }
    const zeroPad =
      datePartValue.toString().length < formatToken.length
        ? '0'.repeat(tokenLength)
        : '';
    return (zeroPad + datePartValue).slice(-tokenLength);
  });

  return outputDate;
}

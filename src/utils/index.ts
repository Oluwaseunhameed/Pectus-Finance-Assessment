export interface UsersObj {
  id: number;
  departments: string;
  project_name: string;
  amount: string;
  date: string;
  member_name: string;
}

export interface HeaderTitle {
  key: string;
  label: string;
}

export function CSVStringToArray(data: string, delimiter: string): UsersObj[] {
  const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
  const titleValues = data.slice(data.indexOf("\n") + 1).split("\n");
  const ansArray = titleValues.map((v: string, key: number) => {
    const values = v.replace(/([^\w\d,./-]|(\.\d*?)0+)/gi, "").split(delimiter);
    if (values.length > 5) {
      values.splice(2, 2, values[2].concat(values[3]));
    }
    const storeKeyValue = titles.reduce(function (
      obj: any,
      title: string,
      index: number
    ) {
      obj["id"] = key + 1;
      obj[title] = values[index];
      return obj;
    },
    {});

    return storeKeyValue;
  });
  return ansArray;
}

export function titleLabel(label: string): string {
  let displayTitle: string | string[] = [];
  if (label.includes("_") && !label.includes("member")) {
    for (let str of label.split("_")) {
      displayTitle.push(str.charAt(0).toUpperCase() + str.slice(1));
    }
    displayTitle = displayTitle.join(" ");
  } else if (label.includes("_") && label.includes("member")) {
    const secondName = label.split("_")[1];
    displayTitle = secondName.charAt(0).toUpperCase() + secondName.slice(1);
  } else {
    displayTitle = label.charAt(0).toUpperCase() + label.slice(1);
  }
  return displayTitle;
}

export function header(obj: UsersObj): HeaderTitle[] {
  let titleContainer: string[] = [];
  let displayTitle = "";
  const headerTitles: HeaderTitle[] = [];

  for (const [i] of Object.entries(obj)) {
    if (i.includes("_") && !i.includes("member")) {
      for (let str of i.split("_")) {
        titleContainer.push(str.charAt(0).toUpperCase() + str.slice(1));
      }
      displayTitle = titleContainer.join(" ");
    } else if (i.includes("_") && i.includes("member")) {
      const secondName = i.split("_")[1];
      displayTitle = secondName.charAt(0).toUpperCase() + secondName.slice(1);
    } else {
      displayTitle = i.charAt(0).toUpperCase() + i.slice(1);
    }
    headerTitles.push({ key: i, label: displayTitle });
  }

  return headerTitles.filter((e) => e.label !== "Id");
}

export const handleFilter = (data: UsersObj[], departmentFilter: string) => {
  return data.reduce(
    (res: { data: Record<string, number>; total: number }, item) => {
      const key = item[departmentFilter as keyof UsersObj];
      res.data[key] = (res.data[key] || 0) + +item.amount;
      res.total += +item.amount;
      return res;
    },
    { data: {}, total: 0 }
  );
};

export const toUserObj = (obj: Record<string, number>, key: string) => {
  return Object.entries(obj).map(([k, v]) => ({
    [key]: k,
    amount: v,
  })) as unknown as Partial<UsersObj>[];
};

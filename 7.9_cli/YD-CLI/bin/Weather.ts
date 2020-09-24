// To parse this data:
//
//   import { Convert, Weather } from "./file";
//
//   const weather = Convert.toWeather(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Weather {
    current_user_url:                     string;
    current_user_authorizations_html_url: string;
    authorizations_url:                   string;
    code_search_url:                      string;
    commit_search_url:                    string;
    emails_url:                           string;
    emojis_url:                           string;
    events_url:                           string;
    feeds_url:                            string;
    followers_url:                        string;
    following_url:                        string;
    gists_url:                            string;
    hub_url:                              string;
    issue_search_url:                     string;
    issues_url:                           string;
    keys_url:                             string;
    label_search_url:                     string;
    notifications_url:                    string;
    organization_url:                     string;
    organization_repositories_url:        string;
    organization_teams_url:               string;
    public_gists_url:                     string;
    rate_limit_url:                       string;
    repository_url:                       string;
    repository_search_url:                string;
    current_user_repositories_url:        string;
    starred_url:                          string;
    starred_gists_url:                    string;
    user_url:                             string;
    user_organizations_url:               string;
    user_repositories_url:                string;
    user_search_url:                      string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWeather(json: string): Weather {
        return cast(JSON.parse(json), r("Weather"));
    }

    public static weatherToJson(value: Weather): string {
        return JSON.stringify(uncast(value, r("Weather")), null, 2);
    }
}

function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Weather": o([
        { json: "current_user_url", js: "current_user_url", typ: "" },
        { json: "current_user_authorizations_html_url", js: "current_user_authorizations_html_url", typ: "" },
        { json: "authorizations_url", js: "authorizations_url", typ: "" },
        { json: "code_search_url", js: "code_search_url", typ: "" },
        { json: "commit_search_url", js: "commit_search_url", typ: "" },
        { json: "emails_url", js: "emails_url", typ: "" },
        { json: "emojis_url", js: "emojis_url", typ: "" },
        { json: "events_url", js: "events_url", typ: "" },
        { json: "feeds_url", js: "feeds_url", typ: "" },
        { json: "followers_url", js: "followers_url", typ: "" },
        { json: "following_url", js: "following_url", typ: "" },
        { json: "gists_url", js: "gists_url", typ: "" },
        { json: "hub_url", js: "hub_url", typ: "" },
        { json: "issue_search_url", js: "issue_search_url", typ: "" },
        { json: "issues_url", js: "issues_url", typ: "" },
        { json: "keys_url", js: "keys_url", typ: "" },
        { json: "label_search_url", js: "label_search_url", typ: "" },
        { json: "notifications_url", js: "notifications_url", typ: "" },
        { json: "organization_url", js: "organization_url", typ: "" },
        { json: "organization_repositories_url", js: "organization_repositories_url", typ: "" },
        { json: "organization_teams_url", js: "organization_teams_url", typ: "" },
        { json: "public_gists_url", js: "public_gists_url", typ: "" },
        { json: "rate_limit_url", js: "rate_limit_url", typ: "" },
        { json: "repository_url", js: "repository_url", typ: "" },
        { json: "repository_search_url", js: "repository_search_url", typ: "" },
        { json: "current_user_repositories_url", js: "current_user_repositories_url", typ: "" },
        { json: "starred_url", js: "starred_url", typ: "" },
        { json: "starred_gists_url", js: "starred_gists_url", typ: "" },
        { json: "user_url", js: "user_url", typ: "" },
        { json: "user_organizations_url", js: "user_organizations_url", typ: "" },
        { json: "user_repositories_url", js: "user_repositories_url", typ: "" },
        { json: "user_search_url", js: "user_search_url", typ: "" },
    ], false),
};

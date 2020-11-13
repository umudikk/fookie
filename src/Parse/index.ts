import * as queryString from "query-string"
import * as rawQueryParser from 'api-query-params'

export default class Parse {
    queryString
    rawQueryParser;

    constructor() {
        this.queryString = queryString
        this.rawQueryParser = rawQueryParser
    }




    longUrl(rawLongQuery: string): Array<string> {
        return rawLongQuery.split('/')
    }

    url(rawUrl: string) {
        let res = this.queryString.parseUrl(rawUrl)
        return { modelName: res.url, rawQuery: res.query }
    }

    query(rawQuery) {
        return this.rawQueryParser(rawQuery)
    }
}
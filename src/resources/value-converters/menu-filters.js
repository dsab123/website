export class MenuFiltersValueConverter {
    toView(obj, convertThese) {

        if (!convertThese) {
            return obj;
        }
        
        if (obj == "Blog") {
            return "Blawg";
        } else if (obj == "About") {
            return "'Bout Me";
        } else if (obj == "Talks") {
            return "talkz I did";
        } else if (obj == "Books") {
            return "my readin";
        }
        
        return obj;
    }
}
export class SummaryQualityFilterValueConverter {
    toView(quality) {
        if (quality == 1) {
            return '⭐';
        } else if (quality == 2) {
            return '⭐⭐';
        } else if (quality == 3) {
            return '⭐⭐⭐';
        } else if (quality == 4) {
            return '⭐⭐⭐⭐';
        } else if (quality == 5) {
            return '⭐⭐⭐⭐⭐';
        }
        
        return quality;
    }
}
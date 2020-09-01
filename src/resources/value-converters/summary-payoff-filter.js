export class SummaryPayoffFilterValueConverter {
    toView(payoff) {
        if (payoff == 1) {
            return '👍';
        } else if (payoff == 2) {
            return '👍👍';
        } else if (payoff == 3) {
            return '👍👍👍';
        } else if (payoff == 4) {
            return '👍👍👍👍';
        } else if (payoff == 5) {
            return '👍👍👍👍👍';
        } else if (payoff == 6) {
            return '👍👍👍👍👍👍';
        } else if (payoff == 7) {
            return '👍👍👍👍👍👍👍';
        } else if (payoff == 8) {
            return '👍👍👍👍👍👍👍👍';
        } else if (payoff == 9) {
            return '👍👍👍👍👍👍👍👍👍';
        } else if (payoff == 10) {
            return '👍👍👍👍👍👍👍👍👍👍';
        }
        
        return payoff;
    }
}

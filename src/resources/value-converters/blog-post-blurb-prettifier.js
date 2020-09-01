export class BlogPostBlurbPrettifierValueConverter {
    toView(blurb) {
        // prettification is simply just ellipses
        return `${blurb} ...`;
    }
}
import {Directive, ElementRef, OnInit, Renderer} from "@angular/core";

@Directive({
  selector: '[appIframe]'
})
export class IframeDirective {

  private el: any;
    private renderer: Renderer;
    private prevHeight: number;
    private sameCount: number;

    constructor(elementRef: ElementRef, renderer: Renderer) {
        this.el = elementRef.nativeElement;
        this.renderer = renderer;
    }

    ngOnInit() {
        const self = this;
        if (this.el.tagName === "IFRAME") {
            this.renderer.listen(this.el, "load", () => {
                self.prevHeight = 0;
                self.sameCount = 0;
                setTimeout(() => {
                    self.setHeight();
                }, 50);
            });
        }
        console.log(this.el)
    }

    setHeight() {
        const self = this;
        if (this.el.contentWindow.document.body.scrollHeight !== this.prevHeight) {
            this.sameCount = 0;
            this.prevHeight = this.el.contentWindow.document.body.scrollHeight;
            this.renderer.setElementStyle(
                self.el,
                "height",
                this.el.contentWindow.document.body.scrollHeight + "px"
            );
            setTimeout(() => {
                self.setHeight();
            }, 50);

        } else {
            this.sameCount++;
            if (this.sameCount < 2) {
                setTimeout(() => {
                    self.setHeight();
                }, 50);
            }
        }
    }
}



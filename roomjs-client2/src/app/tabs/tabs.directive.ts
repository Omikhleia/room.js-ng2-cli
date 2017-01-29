import { Directive, Input, OnInit,
         ViewContainerRef, 
         ComponentFactoryResolver, ComponentRef } from '@angular/core';
         
import { TabsService } from './tabs.service';

/**
 * The directive is set on each tab and is responsible for
 * dynamically creating the content component at initialization
 * and to communicate with the tabs service (to notify changes to
 * the dirty flag).
 */
 
@Directive({
  selector:'[tab]'
})
export class TabDirective implements OnInit {
  @Input('content') content: any; // Component for contents (shall not change after init)
  @Input('index') index: string;  // Tab index
  @Input('data') data: any;       // Data for contents
  
  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private tabs: TabsService
  ) {}

  ngOnInit() {
    this.viewContainer.clear();

    // Create content component
    let componentFactory = 
      this.componentFactoryResolver.resolveComponentFactory(this.content);
    let componentRef: any = this.viewContainer.createComponent(componentFactory);
    
    // Pass data to component (hence the cast to any just above)
    componentRef.instance.data = this.data;

    if (componentRef.instance.dirty) {
      // Has dirty flag, so subscribes to changes and ensure propagation
      // to the service.
      componentRef.instance.dirty.subscribe((dirty: boolean) => {
        this.tabs.setDirty(this.index, dirty);
      });
    }
  }

}

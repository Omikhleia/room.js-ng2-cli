import { Directive, Input, OnInit, Output,
         ViewContainerRef, Component, Type,
         ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { TabsService } from './tabs.service';
import { Tab } from './tabs.model';

/**
 * The directive is set on each tab and is responsible for
 * dynamically creating the content component at initialization
 * and to communicate with the tabs service (to notify changes to
 * the dirty flag).
 */

@Directive({
  selector: '[appTab]'
})
export class TabDirective implements OnInit {
  @Input('content') content: Type<Component>; // Component for contents (shall not change after init)
  @Input('index') index: number;  // Tab index
  @Input('data') data: any;       // Data for contents
  @Input('ref') ref: Tab;         // Reference to tab structure

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private tabs: TabsService
  ) {}

  ngOnInit() {
    this.viewContainer.clear();

    // Create content component
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(this.content);
    const componentRef: any = this.viewContainer.createComponent(componentFactory);

    this.ref.component = componentRef;

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

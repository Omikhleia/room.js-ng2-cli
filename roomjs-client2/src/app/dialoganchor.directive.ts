import { Directive, 
         ViewContainerRef, 
         ComponentFactoryResolver, ComponentFactory, ComponentRef,
         Renderer } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { SocketService } from './socket.service';

/**
 * Directive for modal popups (buttons or inputs).
 */

@Directive({
  selector: '[appDialogAnchor]'
})
export class DialogAnchorDirective {

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  /**
   * Creates a dialog components with the expected input fields
   */
  createDialog(dialogComponent: { new(renderer : Renderer): DialogComponent }, 
               expected: any): ComponentRef<DialogComponent> {
    this.viewContainer.clear();

    let dialogComponentFactory = 
      this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
    let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);
        
    dialogComponentRef.instance.fields = expected.inputs;
    dialogComponentRef.instance.callback = expected.fn;
    return dialogComponentRef;
  }

  /**
   * Creates a dialog components with the action buttons
   */  
  createButtons(buttonsComponent: { new(): ButtonsComponent }, 
                expected: any): ComponentRef<ButtonsComponent> {
    this.viewContainer.clear();

    let dialogComponentFactory = 
      this.componentFactoryResolver.resolveComponentFactory(buttonsComponent);
    let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);
        
    dialogComponentRef.instance.fields = expected.inputs;
    return dialogComponentRef;
  }
  
}

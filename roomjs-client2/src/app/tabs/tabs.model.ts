import { Component, Type, ComponentRef } from '@angular/core';

/**
 * A tab has a name (title), a type of child component, a flag indicating if it may
 * be closed, an optional flag for dirty status, and optional component-specific 
 * data for bindings.
 */
export interface Tab {
  title: string,
  content: Type<Component>,
  close: boolean,
  dirty?: boolean,
  data?: any,
  component?: ComponentRef<any>
}

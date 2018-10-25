import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { RemarkService } from '../remark-wrapper/remark.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export type displayType = 'document' | 'toc' | 'footnotes';

@Component({
  selector: 'wm-markdown, [wm-markdown]',
  templateUrl: './markdown-renderer.component.html',
  styleUrls: ['./markdown-renderer.component.scss'],
  host: {
    '[class.wm-markdown-theme]': 'true'
  }
})
/** Renders a markdown text into HTML using angular recursive template injection 
 * Using Remark as the input parser @see {https://github.com/remarkjs/remark}
*/
export class MarkdownRendererComponent implements OnInit, OnDestroy {
  
  private data$: BehaviorSubject<string> = new BehaviorSubject('');
  private sub$: Subscription;
  private notes: string[] = [];
  public  root:  any;

  constructor(private remark: RemarkService) { }

  @Input() display: displayType = "document";
  @Input() delay: 500;
  @Input('data') set parseData(data: string) {

    // Resets notes
    this.notes = [];

    // Pushes the new data in
    this.data$.next(data);
  }

  @Output() rendered = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();
  
  ngOnInit() { 

    // Perform the remark parsing asyncronously debouncing the iput to improve performance 
    this.sub$ = this.data$.pipe( debounceTime( this.delay ) )
      .subscribe( data => {
        // Builds the syntax tree or source it from a source component
        this.root = data ? this.remark.parse(data) : {};
        console.log(`Markdown (display=${this.display}): `, this.root);

        // Notifies the completion of data parsing the next scheduler round
        // when supposidely the view has been rendered already
        setTimeout( () => this.rendered.emit() );
      });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  // Table of content anchor helper
  public toc(n: number | string): string {
    return `ref${n}`;
  }

  // Definitions helper function
  public definition(id: string): string {
    // Gets the top level children array
    const elements: any[] = this.root ? this.root.children : [];
    // Lookup for the requested definition across the tree (top level only)
    const found = elements.find( el => el.type === 'definition' && el.identifier === id );
    // return the resolve url
    return found ? found.url : null;
  }

  // Footnote helper function
  public footnote(id: string): number {
    // Check if the footnotes was already defined
    const n = this.notes.findIndex(value => value === id);
    // Returns the footnote's index 
    return n < 0 ? this.notes.push(id) : (n + 1);
  }

  // Navigation helper functions
  public navigateUrl(ev: Event, url: string) {
    // Prevent the default browser behavior. This is crucial to avoid reloading the full app 
    // since the renderer fills [href] for both debugging and clarity purposes
    ev.preventDefault();
    // Emits the navigation event for the parent to handle it
    this.navigate.emit(url);
  }

  public navigateDef(ev: Event, id: string) {
    const url = this.definition(id);
    this.navigateUrl(ev, url);
  }

  public navigateToc(ev: Event, id: string) {
    const anchor = `#${this.toc(id)}`;
    this.navigateUrl(ev, anchor);
  }

  // Link helper functions
  public parseLink(link: string) {
    // Resturns the very first part of a link string
    return link.split('?')[0];
  }

  public parseLinkParams(link: string) {

    // Check for parameters ( ex: ../jump-here?mode=set&value=max )
    const parts = link.split('?');
    if(parts.length <= 1) { return null; }

    // Match for parameter pattern
    const re = /(\w+)=(\w*)\&*/g;
    let params = {};

    // Build the parameter object
    parts[1].replace(re, (match: string, param: string, value: string) => {
      params[param] = value;
      return '';
    });

    return params;
  }

  // Helper funtions to support template rendering
 
  public someNodes(nodes: any[], type: string) {
    return nodes ? nodes.some( value => value.type === type ): undefined;
  }

  public filterNodes(nodes: any[], type: string) {
    return nodes ? nodes.filter( value => value.type === type ) : undefined;
  }
/*
  public assertNode(node: any, type: string) {
    if(node && node.type !== type) {
      console.error(`Expected node of type ${type}`, node);
    }
  }

  public infoNode(node: any) {
    console.log('This node type is intentionally not rendered', node);
  }

  public unknownNode(node: any) {
    console.error('Unkown node encounteered', node);
  }*/
}

import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.html',
  styleUrls: ['./loading-bar.scss'],
})
export class LoadingBar implements OnInit, OnDestroy {
  isLoading = signal(true);
  routerSub!: Subscription;

  private readonly _router = inject(Router);

  ngOnInit() {
    this.routerSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => this.isLoading.set(false), 300);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}

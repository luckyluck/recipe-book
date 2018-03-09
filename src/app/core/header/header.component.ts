import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService, public authService: AuthService) {}

    onSave() {
        this.dataStorageService.storeRecipes();
    }

    onGet() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }
 }

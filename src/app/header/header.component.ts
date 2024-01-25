import { Component } from "@angular/core";
import { faRegistered } from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaserComponent {
    registered = faRegistered;
}
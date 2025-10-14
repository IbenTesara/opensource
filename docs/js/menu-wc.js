'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@opensource/source documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/MockTourHolderComponent.html" data-type="entity-link" >MockTourHolderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MockTourStepComponent.html" data-type="entity-link" >MockTourStepComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxAccordionComponent.html" data-type="entity-link" >NgxAccordionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxAccordionItemComponent.html" data-type="entity-link" >NgxAccordionItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxConfigurableLayoutComponent.html" data-type="entity-link" >NgxConfigurableLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxConfigurableLayoutItemComponent.html" data-type="entity-link" >NgxConfigurableLayoutItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxCurrencyTableCellComponent.html" data-type="entity-link" >NgxCurrencyTableCellComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxDateTableCellComponent.html" data-type="entity-link" >NgxDateTableCellComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxI18nEmptyComponent.html" data-type="entity-link" >NgxI18nEmptyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxImageMarkerComponent.html" data-type="entity-link" >NgxImageMarkerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxMobileLayoutComponent.html" data-type="entity-link" >NgxMobileLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxTableComponent.html" data-type="entity-link" >NgxTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxToastContainerComponent.html" data-type="entity-link" >NgxToastContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TestDisplayContentComponent.html" data-type="entity-link" >TestDisplayContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TestErrorComponent.html" data-type="entity-link" >TestErrorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TestErrorDataComponent.html" data-type="entity-link" >TestErrorDataComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TestLoadingComponent.html" data-type="entity-link" >TestLoadingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TestOfflineComponent.html" data-type="entity-link" >TestOfflineComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TestOverrideDisplayContentComponent.html" data-type="entity-link" >TestOverrideDisplayContentComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/DataFormAccessor.html" data-type="entity-link" >DataFormAccessor</a>
                                </li>
                                <li class="link">
                                    <a href="directives/FocusClickDirective.html" data-type="entity-link" >FocusClickDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/FormAccessor.html" data-type="entity-link" >FormAccessor</a>
                                </li>
                                <li class="link">
                                    <a href="directives/FormAccessorContainer.html" data-type="entity-link" >FormAccessorContainer</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxAbstractTableCellDirective.html" data-type="entity-link" >NgxAbstractTableCellDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxAccessibleAbstractDragAndDropItemDirective.html" data-type="entity-link" >NgxAccessibleAbstractDragAndDropItemDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxAccessibleDragAndDropContainerDirective.html" data-type="entity-link" >NgxAccessibleDragAndDropContainerDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxAccessibleDragAndDropHostDirective.html" data-type="entity-link" >NgxAccessibleDragAndDropHostDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxAccessibleDragAndDropItemDirective.html" data-type="entity-link" >NgxAccessibleDragAndDropItemDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxButtonDirective.html" data-type="entity-link" >NgxButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxCookiesFallBackComponent.html" data-type="entity-link" >NgxCookiesFallBackComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxCypressTagDirective.html" data-type="entity-link" >NgxCypressTagDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxDisplayContentComponent.html" data-type="entity-link" >NgxDisplayContentComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxDisplayContentDirective.html" data-type="entity-link" >NgxDisplayContentDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxFormsControlValueAccessor.html" data-type="entity-link" >NgxFormsControlValueAccessor</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxFormsErrorAbstractComponent.html" data-type="entity-link" >NgxFormsErrorAbstractComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxFormsErrorsDirective.html" data-type="entity-link" >NgxFormsErrorsDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxHasCookieDirective.html" data-type="entity-link" >NgxHasCookieDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxHasFeatureDirective.html" data-type="entity-link" >NgxHasFeatureDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxHasFocusDirective.html" data-type="entity-link" >NgxHasFocusDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxHasFocusDragAndDropAbstractDirective.html" data-type="entity-link" >NgxHasFocusDragAndDropAbstractDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxHasPermissionDirective.html" data-type="entity-link" >NgxHasPermissionDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxIsAuthenticatedDirective.html" data-type="entity-link" >NgxIsAuthenticatedDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxLinkDirective.html" data-type="entity-link" >NgxLinkDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxMediaQueryDirective.html" data-type="entity-link" >NgxMediaQueryDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxModalAbstractComponent.html" data-type="entity-link" >NgxModalAbstractComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxQueryParamFormSyncComponent.html" data-type="entity-link" >NgxQueryParamFormSyncComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxSaveOnExitComponent.html" data-type="entity-link" >NgxSaveOnExitComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTableCellDirective.html" data-type="entity-link" >NgxTableCellDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTableOpenRowStateTemplateAbstractComponent.html" data-type="entity-link" >NgxTableOpenRowStateTemplateAbstractComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTableSelectTemplateAbstractComponent.html" data-type="entity-link" >NgxTableSelectTemplateAbstractComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTableSortTemplateAbstractComponent.html" data-type="entity-link" >NgxTableSortTemplateAbstractComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxToastBundlerComponent.html" data-type="entity-link" >NgxToastBundlerComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxToastComponent.html" data-type="entity-link" >NgxToastComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTooltipAbstractComponent.html" data-type="entity-link" >NgxTooltipAbstractComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTooltipDirective.html" data-type="entity-link" >NgxTooltipDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTourItemDirective.html" data-type="entity-link" >NgxTourItemDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTourShowWhenDirective.html" data-type="entity-link" >NgxTourShowWhenDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTourStepComponent.html" data-type="entity-link" >NgxTourStepComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTreeGridCellDirective.html" data-type="entity-link" >NgxTreeGridCellDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTreeGridDirective.html" data-type="entity-link" >NgxTreeGridDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgxTreeGridRowDirective.html" data-type="entity-link" >NgxTreeGridRowDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseFormAccessor.html" data-type="entity-link" >BaseFormAccessor</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgxAccessibleDragAndDropAbstractService.html" data-type="entity-link" >NgxAccessibleDragAndDropAbstractService</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgxAuthenticationAbstractService.html" data-type="entity-link" >NgxAuthenticationAbstractService</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgxI18nAbstractClient.html" data-type="entity-link" >NgxI18nAbstractClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgxI18nAbstractService.html" data-type="entity-link" >NgxI18nAbstractService</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgxI18nMultiTranslationHttpLoader.html" data-type="entity-link" >NgxI18nMultiTranslationHttpLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgxSaveOnExitAbstractService.html" data-type="entity-link" >NgxSaveOnExitAbstractService</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgxValidators.html" data-type="entity-link" >NgxValidators</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/EffectsService.html" data-type="entity-link" >EffectsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxAuthenticatedHttpClient.html" data-type="entity-link" >NgxAuthenticatedHttpClient</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxBroadcastChannelService.html" data-type="entity-link" >NgxBroadcastChannelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxCookieService.html" data-type="entity-link" >NgxCookieService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxI18nLoadingService.html" data-type="entity-link" >NgxI18nLoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxI18nRootService.html" data-type="entity-link" >NgxI18nRootService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxI18nService.html" data-type="entity-link" >NgxI18nService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxI18nTranslationLoaderResolver.html" data-type="entity-link" >NgxI18nTranslationLoaderResolver</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxImageMarkerService.html" data-type="entity-link" >NgxImageMarkerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxMediaQueryService.html" data-type="entity-link" >NgxMediaQueryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxMediaQueryService-1.html" data-type="entity-link" class="deprecated-name">NgxMediaQueryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxMobileLayoutService.html" data-type="entity-link" >NgxMobileLayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxModalService.html" data-type="entity-link" >NgxModalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxOnlineService.html" data-type="entity-link" >NgxOnlineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxSignalStoreService.html" data-type="entity-link" >NgxSignalStoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxStorageService.html" data-type="entity-link" >NgxStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxStoreService.html" data-type="entity-link" >NgxStoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxToastService.html" data-type="entity-link" >NgxToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxTooltipService.html" data-type="entity-link" >NgxTooltipService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxTourService.html" data-type="entity-link" >NgxTourService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxWindowService.html" data-type="entity-link" >NgxWindowService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpecStoreService.html" data-type="entity-link" >SpecStoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StoreEffects.html" data-type="entity-link" >StoreEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StoreStateService.html" data-type="entity-link" >StoreStateService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AtLeastOneRequiredValidatorOptions.html" data-type="entity-link" >AtLeastOneRequiredValidatorOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseStore.html" data-type="entity-link" >BaseStore</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseStoreActions.html" data-type="entity-link" >BaseStoreActions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseStoreAssets.html" data-type="entity-link" >BaseStoreAssets</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseStoreAssetsGeneratorOptions.html" data-type="entity-link" >BaseStoreAssetsGeneratorOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseStoreSelectors.html" data-type="entity-link" >BaseStoreSelectors</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasicEntityAdapterReducerActions.html" data-type="entity-link" >BasicEntityAdapterReducerActions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasicEntityState.html" data-type="entity-link" >BasicEntityState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentTypeWrapper.html" data-type="entity-link" >ComponentTypeWrapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntityStoreActions.html" data-type="entity-link" >EntityStoreActions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntityStoreAssets.html" data-type="entity-link" >EntityStoreAssets</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntityStoreAssetsGeneratorOptions.html" data-type="entity-link" >EntityStoreAssetsGeneratorOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntityStoreSelectors.html" data-type="entity-link" >EntityStoreSelectors</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormStateOptionsEntity.html" data-type="entity-link" >FormStateOptionsEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxAccessibleDragAndDropBaseMessage.html" data-type="entity-link" >NgxAccessibleDragAndDropBaseMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxAccessibleDragAndDropMessageRecord.html" data-type="entity-link" >NgxAccessibleDragAndDropMessageRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxAccessibleDragAndDropMoveEvent.html" data-type="entity-link" >NgxAccessibleDragAndDropMoveEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxAuthenticatedHttpClientConfiguration.html" data-type="entity-link" >NgxAuthenticatedHttpClientConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxAuthenticatedRoute.html" data-type="entity-link" >NgxAuthenticatedRoute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxAuthenticationConfiguration.html" data-type="entity-link" >NgxAuthenticationConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxButtonConfiguration.html" data-type="entity-link" >NgxButtonConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxConfigurableLayoutItemDropEvent.html" data-type="entity-link" >NgxConfigurableLayoutItemDropEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxConfigurableLayoutItemEntity.html" data-type="entity-link" >NgxConfigurableLayoutItemEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxCookie.html" data-type="entity-link" >NgxCookie</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxCookieChangedEvent.html" data-type="entity-link" >NgxCookieChangedEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxCookieConfiguration.html" data-type="entity-link" >NgxCookieConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxCookieEvent.html" data-type="entity-link" >NgxCookieEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxCookieLanguageConfiguration.html" data-type="entity-link" >NgxCookieLanguageConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxCookieValue.html" data-type="entity-link" >NgxCookieValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxDisplayContentConfiguration.html" data-type="entity-link" >NgxDisplayContentConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxFormsErrorConfigurationOptions.html" data-type="entity-link" >NgxFormsErrorConfigurationOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxHasCookieConfiguration.html" data-type="entity-link" >NgxHasCookieConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxI18nConfiguration.html" data-type="entity-link" >NgxI18nConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxImageMarkerBase.html" data-type="entity-link" >NgxImageMarkerBase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxImageMarkerConfiguration.html" data-type="entity-link" >NgxImageMarkerConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxImageMarkerEdit.html" data-type="entity-link" >NgxImageMarkerEdit</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxImageMarkerTypes.html" data-type="entity-link" >NgxImageMarkerTypes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxImageMarkerView.html" data-type="entity-link" >NgxImageMarkerView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxLinkConfiguration.html" data-type="entity-link" >NgxLinkConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxMediaQuery.html" data-type="entity-link" >NgxMediaQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxMobileLayoutBase.html" data-type="entity-link" >NgxMobileLayoutBase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxModalAriaLabelBaseOptions.html" data-type="entity-link" >NgxModalAriaLabelBaseOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxModalAriaLabelledOptions.html" data-type="entity-link" >NgxModalAriaLabelledOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxModalAriaLabelOptions.html" data-type="entity-link" >NgxModalAriaLabelOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxModalBaseConfiguration.html" data-type="entity-link" >NgxModalBaseConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxModalBaseOptions.html" data-type="entity-link" >NgxModalBaseOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxModalCDKModalConfiguration.html" data-type="entity-link" >NgxModalCDKModalConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxModalComponentConfiguration.html" data-type="entity-link" >NgxModalComponentConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxModalComponentOptions.html" data-type="entity-link" >NgxModalComponentOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxModalGlobalCDKConfiguration.html" data-type="entity-link" >NgxModalGlobalCDKConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxModalTypeOptions.html" data-type="entity-link" >NgxModalTypeOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxReplaceElementsConfigurationElement.html" data-type="entity-link" >NgxReplaceElementsConfigurationElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxReplaceElementsItem.html" data-type="entity-link" >NgxReplaceElementsItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxSignalStoreSlice.html" data-type="entity-link" >NgxSignalStoreSlice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxSignalStoreSliceArrayMethods.html" data-type="entity-link" >NgxSignalStoreSliceArrayMethods</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxSignalStoreSliceBaseMethods.html" data-type="entity-link" >NgxSignalStoreSliceBaseMethods</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxStorage.html" data-type="entity-link" >NgxStorage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxStorageBaseEvent.html" data-type="entity-link" >NgxStorageBaseEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxStorageClearEvent.html" data-type="entity-link" >NgxStorageClearEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxStorageRemoveEvent.html" data-type="entity-link" >NgxStorageRemoveEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxStorageSetEvent.html" data-type="entity-link" >NgxStorageSetEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxStore.html" data-type="entity-link" >NgxStore</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTableConfiguration.html" data-type="entity-link" >NgxTableConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTableCypressDataTagsBase.html" data-type="entity-link" >NgxTableCypressDataTagsBase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTableShowHeaderRequirements.html" data-type="entity-link" >NgxTableShowHeaderRequirements</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTableSortEvent.html" data-type="entity-link" >NgxTableSortEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxToast.html" data-type="entity-link" >NgxToast</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxToastConfiguration.html" data-type="entity-link" >NgxToastConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxToastDefaultConfiguration.html" data-type="entity-link" >NgxToastDefaultConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxToastEvent.html" data-type="entity-link" >NgxToastEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxToastMaxAmountBaseConfiguration.html" data-type="entity-link" >NgxToastMaxAmountBaseConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxToastMaxAmountBundleConfiguration.html" data-type="entity-link" >NgxToastMaxAmountBundleConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxToastMaxAmountOtherConfiguration.html" data-type="entity-link" >NgxToastMaxAmountOtherConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTooltipActiveElementEvent.html" data-type="entity-link" >NgxTooltipActiveElementEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTooltipActiveTooltipEvent.html" data-type="entity-link" >NgxTooltipActiveTooltipEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTooltipBaseEvent.html" data-type="entity-link" >NgxTooltipBaseEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTooltipConfiguration.html" data-type="entity-link" >NgxTooltipConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTooltipInactiveEvent.html" data-type="entity-link" >NgxTooltipInactiveEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTooltipItem.html" data-type="entity-link" >NgxTooltipItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTourBackdropClipEvent.html" data-type="entity-link" >NgxTourBackdropClipEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTourRouteOptions.html" data-type="entity-link" >NgxTourRouteOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTourStep.html" data-type="entity-link" >NgxTourStep</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTourTokenConfiguration.html" data-type="entity-link" >NgxTourTokenConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpecStoreAssets.html" data-type="entity-link" >SpecStoreAssets</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StoreAssetsOptions.html" data-type="entity-link" >StoreAssetsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StoreState.html" data-type="entity-link" >StoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableCellTemplate.html" data-type="entity-link" >TableCellTemplate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TranslationLoaderActionEntity.html" data-type="entity-link" >TranslationLoaderActionEntity</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/BtwPipe.html" data-type="entity-link" >BtwPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/HasObserversPipe.html" data-type="entity-link" >HasObserversPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/IbanPipe.html" data-type="entity-link" >IbanPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/NgxAriaSortPipe.html" data-type="entity-link" >NgxAriaSortPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/NgxConfigurableLayoutItemSizePipe.html" data-type="entity-link" >NgxConfigurableLayoutItemSizePipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/NgxHasFeaturePipe.html" data-type="entity-link" >NgxHasFeaturePipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/NgxHasPermissionPipe.html" data-type="entity-link" >NgxHasPermissionPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/NgxMatchesQueryPipe.html" data-type="entity-link" >NgxMatchesQueryPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/NgxReplaceElementsPipe.html" data-type="entity-link" >NgxReplaceElementsPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/NgxTableGetPipe.html" data-type="entity-link" >NgxTableGetPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/NgxTableHasObserversPipe.html" data-type="entity-link" >NgxTableHasObserversPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/NgxTableShowHeaderPipe.html" data-type="entity-link" >NgxTableShowHeaderPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/NgxTableSortIconPipe.html" data-type="entity-link" >NgxTableSortIconPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/TransformPipe.html" data-type="entity-link" >TransformPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
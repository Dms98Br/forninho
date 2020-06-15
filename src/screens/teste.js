<FlatList data={this.state.visibleForninho}                        
                        keyExtractor = {item => `${item.id}`}
                        renderItem={ ( { item } ) => {
                            return(
                                <TouchableOpacity onPress = {() => this.setState({ showGetRecipes: true})}>
                                    <Forninho {...item}
                                        onToggleForninho={this.toggleForninho} 
                                        onDelete={this.deleteForninho}/>
                                </TouchableOpacity>
                            )
                        }
                    }/> 
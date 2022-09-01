import React from 'react'
import { MentionsInput, Mention } from 'react-mentions'

export default function StartAPostInput() {
    return (
        <MentionsInput value={this.state.value} onChange={this.handleChange}>
            <Mention
                trigger="@"
                data={this.props.users}
                renderSuggestion={this.renderUserSuggestion}
            />
            <Mention
                trigger="#"
                data={this.requestTag}
                renderSuggestion={this.renderTagSuggestion}
            />
        </MentionsInput>
    )
}

/*
 * Copyright 2007-2013 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */


import Player from './Player';

class PydioSoundManager extends React.Component {

    constructor(props) {
        super(props)

        const {pydio, node, preview} = props

        this.state = {
            url: pydio.Parameters.get('ajxpServerAccess') + '&get_action=audio_proxy&file=' + encodeURIComponent(HasherUtils.base64_encode(node.getPath())) + '&z=' + guid(),
            mimeType: "audio/" + node.getAjxpMime(),
            preview: preview
        }

        this.onReady = () => this.setState({ready: false})
    }

    // Static functions
    static getPreviewComponent(node, rich = false) {
        return {
            element: PydioSoundManager,
            props: {
                node: node,
                rich: rich
            }
        }
    }

    render() {
        return (
            <PydioComponents.AbstractEditor {...this.props} loading={false} preview={this.state.preview}>
                <Player rich={this.props.rich} onReady={this.onReady}>
                    <a type={this.state.mimeType} href={this.state.url} />
                </Player>
            </PydioComponents.AbstractEditor>
        );
    }
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

// We need to attach the element to window else it won't be found
window.PydioSoundManager = PydioSoundManager

export default PydioSoundManager

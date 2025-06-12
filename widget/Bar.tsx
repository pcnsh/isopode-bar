import { App, Astal, Gtk, Gdk, Audio } from "astal/gtk4"
import { Variable } from "astal"

const time = Variable("").poll(10000, "date '+%d/%m %R'")

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
    const percentage = new Variable(
        () => `${Math.round((speaker?.volume ?? 0) * 100)}%`
    );

    return <window
        visible
        cssClasses={["Bar"]}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox cssName="centerbox">
            <box/>
            <box halign={Gtk.Align.END}>
                <menubutton>
                    <Gtk.Image iconName={"system-search"}/>
                    <popover autohide={false} hasArrow={false} cssClasses={["control-popup"]} position={Gtk.PositionType.BOTTOM}>
                        <box
                            halign={Gtk.Align.END}
                            vertical
                        >
                                <label halign={Gtk.Align.START}label={"Control Center"}/>
                            <box >
                                <box
                                    cssClasses={["group-menu"]}
                                    valign={Gtk.Align.START}
                                    orientation={Gtk.Orientation.VERTICAL} 
                                    hSpacing={8} 
                                >
                                    <label halign={Gtk.Align.START} label={"Brightness"}/>
                                    <box vexpand valign={Gtk.Align.END} cssClasses={["audio-slider"]}>
                                        <overlay>
                                              <box >
                                                <slider hexpand drawValue={false} />

                                                  </box>
                                                <label
                                                    label="01"
                                                    halign={Gtk.Align.START}
                                                    valign={Gtk.Align.CENTER}
                                                    type="overlay"
                                                    canFocus={false}
                                                    canTarget={false}
                                                    passThrough
                                                />
                                        </overlay>
                                    </box>
                                </box>
                                <box
                                    cssClasses={["group-menu"]}
                                    valign={Gtk.Align.START}
                                    orientation={Gtk.Orientation.VERTICAL} 
                                    hSpacing={8} 
                                >
                                    <label halign={Gtk.Align.START} label={"Sound"}/>
                                    <box vexpand valign={Gtk.Align.END} cssClasses={["audio-slider"]}>
                                        <slider hexpand drawValue={false} />
                                    </box>
                                </box>

                             </box>
                        </box>
                    </popover>
                </menubutton>
                <menubutton
                    hexpand
                >
                    <label label={time()} />
                    <popover
                        hasArrow={false}
                        cssClasses={["calendar-popup"]}
                    >
                        <Gtk.Calendar />
                    </popover>
                </menubutton>
            </box>
        </centerbox>
    </window>
}


            // <button
            //     onClicked="echo hello"
            //     hexpand
            //     halign={Gtk.Align.CENTER}
            // >
            //     Welcome to AGS!
            // </button>

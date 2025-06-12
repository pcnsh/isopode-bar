import { App, Astal, Gtk, Gdk, Audio } from "astal/gtk4"
import { Variable } from "astal"

export default function Slider(props) {
  return  <box
            cssClasses={["group-menu"]}
            valign={Gtk.Align.START}
            orientation={Gtk.Orientation.VERTICAL}
            hSpacing={8}
            >
            <label halign={Gtk.Align.START} label={`${props.title}`}/>
            <label cssClasses={["state"]}halign={Gtk.Align.START} label={"Normal"}/>
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
                        <box
                            halign={Gtk.Align.END}
                            valign={Gtk.Align.CENTER}
                            type="overlay"
                            canFocus={false}
                            canTarget={false}
                            passThrough
                        >
                            <Gtk.Image cssClasses={["icon"]} iconName={`${props.icon}`}/>
                        </box>
                </overlay>
              </box>
            </box>
}
